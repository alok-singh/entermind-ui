import { Info, Loader, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import AwsBillPdfPreview from '../../components/awsBillPdfPreview';
import Button from '../../components/button';
import Card from '../../components/card';
import UploadInput from '../../components/upload-input';
import { CLIENT_ID, POST_COST_URL, POST_UPLOAD_PDF, SUPPORTED_PDF_FILE_TYPES } from '../../config/vars';
import iconMap from '../../icons/lucid-icons';
import { setUploadPDFData, setUploadPDFLoading } from '../../reducers/data-page-reducer';
import { formatDateToYYYYMMDD, parseAWSDateRange } from '../../utils/date.util';
import { postResource, uploadPdf } from '../../utils/http.util';
import { removeEmpty } from '../../utils/parse.util';

const UploadHeader = (props) => {
  return (
    <>
      <h2 className="text-lg font-semibold text-gray-800">{props.title}</h2>
      <p className="text-sm text-gray-500 mb-4">{props.description}</p>
    </>
  );
};

const UploadInfoSection = (props) => {
  return (
    <div className="flex items-start w-full rounded-lg border px-4 py-3 text-sm gap-3 text-[#0f1419] border-[#0066ff]/30 bg-[#0066ff]/5 mb-6">
      <Info size={14} className="mt-0.75" />
      <div className="text-[#5c6370] text-xs">
        <strong>Supported vendors:</strong>
        <div className="pt-2">{props.supportedVendors}</div>
      </div>
    </div>
  );
};

const HowItWorksCard = (props) => {
  return (
    <Card className="border border-dashed border-gray-200 bg-white mt-6">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3 p-2">
        <Sparkles className="text-[#00d68f] mt-0.75" size={20} />
        <div>
          <h2 className="text-sm font-semibold text-gray-800">{props.title}</h2>
          {/* Steps */}
          <ol className="list-decimal list-inside text-xs text-[#5c6370] space-y-1">
            {props.steps.map((step, index) => (
              <li className="mt-2" key={index}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Card>
  );
};

const ParsedPDFData = (props) => {
  return (
    <div className="file-content-wrapper border border-[#e2e8f0] rounded-xl mt-6">
      {props.uploadData.map((item) => {
        return <AwsBillPdfPreview {...item} />;
      })}
      <div className="flex items-center justify-end gap-1 mb-4 mx-6">
        <Button className="text-white bg-[#06f] text-[12.25px] flex items-center justify-center gap-4 px-[15px] py-[3px] mb-[7px]" onClick={() => props.onClickSubmit()}>
          Submit
        </Button>
        <Button className="text-white bg-[#f36] text-[12.25px] flex items-center justify-center gap-4 px-[15px] py-[3px] mb-[7px]" onClick={() => props.onClickCancel()}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

const FilePDFUploadSection = (props) => {
  const dispatch = useDispatch();
  const { fileName, isLoading, uploadData } = useSelector((state) => state.uploadPage.value.uploadPDF);

  const handleFileChange = async (fileList) => {
    dispatch(setUploadPDFLoading(true));
    const files = Array.from(fileList);
    const result = await uploadPdf(POST_UPLOAD_PDF, files, SUPPORTED_PDF_FILE_TYPES.AWS_BILL);
    dispatch(setUploadPDFData({ fileName: files?.map(({ name }) => name)?.join(', '), uploadData: result?.response }));
    dispatch(setUploadPDFLoading(false));
  };

  const processFile = async () => {
    const data = uploadData.flatMap((data) => {
      const { start, end } = parseAWSDateRange(data.billingPeriod);
      const startMilliseconds = start.getTime();
      const endMilliseconds = end.getTime();
      return data?.results?.flatMap?.((service) => {
        return service?.details?.flatMap?.((region) => {
          return (
            region?.subtotal?.flatMap?.((lineItemList) => {
              return lineItemList?.rates?.flatMap?.((rateItem) => {
                return removeEmpty({
                  startDate: startMilliseconds,
                  endDate: endMilliseconds,
                  billingAccount: data.account,
                  industry: 'Cloud',
                  category: service.subcategory,
                  subcategory: lineItemList.title,
                  description: rateItem.rate,
                  costType: 'fixed',
                  vendor: 'AWS',
                  department: 'UES',
                  modelService: service.subcategory,
                  cloudRegion: region.title,
                  environment: 'production',
                  usageUnit: rateItem.quantity,
                  quantity: rateItem.quantity,
                  monthlyCost: rateItem.amount,
                  annualizedCost: rateItem.amount * 12,
                  contractId: 'AWS-2021',
                  owner: 'Alok',
                  tags: 'aws bill upload',
                  notes: lineItemList.title
                });
              });
            }) || [
              removeEmpty({
                startDate: startMilliseconds,
                endDate: endMilliseconds,
                billingAccount: data.account,
                industry: 'Cloud',
                category: service.subcategory,
                subcategory: region.title,
                costType: 'fixed',
                vendor: 'AWS',
                department: 'UES',
                modelService: service.subcategory,
                environment: 'production',
                monthlyCost: region.amount,
                annualizedCost: region.amount * 12,
                contractId: 'AWS-2021',
                owner: 'Alok',
                tags: 'aws bill upload'
              })
            ]
          );
        });
      });
    });

    // api call to send data to server
    await postResource(POST_COST_URL, { client: CLIENT_ID, data });
  };

  return (
    <div className="p-6 border-[#e2e8f0] border mt-2 rounded-xl">
      {/* Header */}
      <UploadHeader title={props.title} description={props.description} />
      {props.infoSection && <UploadInfoSection {...props.infoSection} />}
      {/* Upload Box */}

      <UploadInput
        icon={iconMap[props.icon](props.iconProps)}
        handleFileChange={({ target }) => handleFileChange(target?.files)}
        fileName={fileName}
        title={props.uploadBoxTitle}
        accept={props.inputTypeAccept}
        multiple={true}
        isLoading={isLoading}
      />

      {uploadData?.length !== 0 && (
        <ParsedPDFData uploadData={uploadData} onClickSubmit={processFile} onClickCancel={() => dispatch(setUploadPDFData({ fileName: '', uploadData: '' }))} />
      )}
      <HowItWorksCard {...props.howItWorksInfo} />
    </div>
  );
};

export default FilePDFUploadSection;
