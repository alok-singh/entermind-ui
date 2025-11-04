/* eslint-disable react-hooks/exhaustive-deps */
import { Database } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card';
import Tabs from '../../components/tabs';
import data from '../../data/data-upload-store.json';
import iconMap from '../../icons/lucid-icons';
import { setSelectedTabIndex, uploadHistory } from '../../reducers/data-page-reducer';
import { fetchUploadHistory } from './data-store.util';
import EntryHistorySection from './entry-history-section';
import ManualEntrySection from './manual-entry-section';
import TemplateSection from './template-section';
import FileCSVUploadSection from './upload-csv-file-section';
import FilePDFUploadSection from './upload-pdf-file-section';

const PageHeader = (props) => {
  return (
    <div className="header-wrapper">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#0066ff] to-[#0066ff]/70 flex items-center justify-center">
          <Database width="17.5px" height="17.5px" color="white" />
        </div>
        <h1 className="text-2xl text-[#0066ff]">{props.sectionTitle}</h1>
      </div>
      <div className="text-[#5c6370] text-[14px]">{props.sectionDescription}</div>
    </div>
  );
};

const HeaderCards = (props) => {
  return (
    <div className="mt-[21px] mb-[21px] grid grid-cols-4 gap-4">
      {props.cards.map((item) => {
        return (
          <Card className="border-[#eaeaea] border" key={item.id}>
            <div className="flex items-center justify-between p-1">
              <div className="card-title">
                <h3 className="text-[21px] font-semibold">{props.history.id === item.id ? props.history.count : item.title}</h3>
                <div className="text-[#5c6370] text-[12.25px]">{item.description}</div>
              </div>
              {iconMap[item.icon](item.iconProps)}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

const DataStorePage = () => {
  const dispatch = useDispatch();
  const { selectedTabIndex, history } = useSelector((state) => state.uploadPage.value);

  useEffect(() => {
    const innerFunction = async () => {
      const response = await fetchUploadHistory();
      dispatch(uploadHistory(response));
    };
    innerFunction();
  }, []);

  return (
    <div className="bg-[#f5f5f7] min-h-screen">
      <div className="max-w-[1400px] mx-auto p-8 bg-white">
        <PageHeader {...data.headerSection} />
        <HeaderCards cards={data.headerSection.cards} history={{ count: history.uploadHistoryEntries.length, id: 'recent-entries' }} />
        <Tabs tabs={data.tabsSection} selectedTabIndex={selectedTabIndex} setSelectedTabIndex={(index) => dispatch(setSelectedTabIndex(index))} />
        {selectedTabIndex === 0 ? <TemplateSection {...data.tabsSection[selectedTabIndex]} /> : null}
        {selectedTabIndex === 1 ? <FileCSVUploadSection {...data.tabsSection[selectedTabIndex].details} /> : null}
        {selectedTabIndex === 2 ? <FilePDFUploadSection {...data.tabsSection[selectedTabIndex].details} /> : null}
        {selectedTabIndex === 3 ? <ManualEntrySection {...data.tabsSection[selectedTabIndex]} /> : null}
        {selectedTabIndex === 4 ? <EntryHistorySection {...data.tabsSection[selectedTabIndex]} /> : null}
      </div>
    </div>
  );
};

export default DataStorePage;
