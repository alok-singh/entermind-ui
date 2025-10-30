import { AlertCircle, CheckCheck, Eye, Loader } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button';
import Table from '../../components/table';
import UploadInput from '../../components/upload-input';
import { TEMPLATES } from '../../config/vars';
import iconMap from '../../icons/lucid-icons';
import { setUploadData, setUploadLoading } from '../../reducers/data-page-reducer';
import { createTemplateRequestBody } from '../../utils/create-request-body.util';
import { postResource } from '../../utils/http.util';
import { parseCSVFile } from '../../utils/parse.util';

const UploadHeader = (props) => {
  return (
    <>
      <h2 className="text-lg font-semibold text-gray-800">{props.title}</h2>
      <p className="text-sm text-gray-500 mb-4">{props.description}</p>
    </>
  );
};

const ValidationSummary = (props) => {
  const { validRows, totalRows, errors } = props;
  const progress = (validRows / totalRows) * 100;

  return (
    <div className="mt-4 bg-[#ff69000d] border border-[#ff690080] rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 text-[14px]">
        <AlertCircle className="text-[#ff6900]" />
        <div>
          <h2 className="text-[14px] font-semibold text-gray-800">Validation Issues Found</h2>
          <p className="text-sm text-gray-600">
            {validRows} of {totalRows} rows are valid
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-700 mb-1">
          <span className="text-xs">Valid rows</span>
          <span>
            {validRows}/{totalRows}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded">
          <div className="h-2 bg-[#007aff] text-[600] rounded" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Errors */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Errors:</p>
        {errors.map((error, idx) => (
          <div key={idx} className="bg-white rounded p-4 mb-3 shadow-sm">
            <p className="text-[#f54a00] text-xs mb-2">Row {error.row}:</p>
            <ul className="list-disc list-inside text-[#5c6370] text-xs">
              {error.messages.map((msg, i) => (
                <li className="mb-[3.5px]" key={i}>
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const DataPreview = (props) => {
  const { rows, columns } = props.data;
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Eye className="text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-800">Data Preview</h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Template: {props.template.name} <br /> Showing first {rows.length} rows
      </p>

      {props.isValid ? (
        <div className="flex gap-[5px] text-[#00d68f] font-semibold mb-3">
          <CheckCheck /> Valid File
        </div>
      ) : null}

      {/* Table */}
      <div className="overflow-x-auto">
        <Table emptyTitle="No entries yet" columns={columns} emptyDescription="Create your first entry using the tabs above" rows={rows} />
      </div>
      {props.isValid ? (
        <div className="flex items-center justify-center">
          <Button isLoading={props.isLoading} className="bg-[#007aff] text-white px-4 py-2 my-4 text-[14px]" onClick={props.processFile}>
            {props.isLoading ? 'Uploading ...' : 'Submit File'}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

const FileUploadSection = (props) => {
  const dispatch = useDispatch();
  const { fileName, errors, data, totalRows, validRows, template, isLoading } = useSelector((state) => state.uploadPage.value.uploadCSV);

  const handleFileChange = async ([file]) => {
    const results = await parseCSVFile(file);
    dispatch(setUploadData({ fileName: file?.name, results }));
  };

  const processFile = async () => {
    // api call to send data to server
    const postUrl = TEMPLATES[template.name].POST_API;
    const requestBody = createTemplateRequestBody(data);
    dispatch(setUploadLoading(true));
    await postResource(postUrl, requestBody);
    dispatch(setUploadLoading(false));
  };

  return (
    <div className="p-6 border-[#e2e8f0] border mt-2 rounded-xl">
      {/* Header */}
      <UploadHeader title={props.title} description={props.description} />
      {/* Upload Box */}
      <UploadInput
        icon={iconMap[props.icon](props.iconProps)}
        handleFileChange={({ target }) => handleFileChange(target?.files)}
        fileName={fileName}
        title={props.uploadBoxTitle}
      />
      {errors.length ? <ValidationSummary errors={errors} totalRows={totalRows} validRows={validRows} /> : null}
      {data?.columns?.length ? <DataPreview data={data} template={template} isValid={errors.length === 0} processFile={processFile} isLoading={isLoading} /> : null}
    </div>
  );
};

export default FileUploadSection;
