import { DollarSign, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button';
import CalendarInput from '../../components/calendar-input';
import Input from '../../components/input';
import { CLIENT_ID, TEMPLATES } from '../../config/vars';
import { setManualEntryFormData, setManualEntryLoading, setManualEntryTemplate } from '../../reducers/data-page-reducer';
import { fieldValidators } from '../../utils/field-validators.util';
import { postResource } from '../../utils/http.util';
import { removeEmpty } from '../../utils/parse.util';

const RenderField = (props) => {
  if (props.field === 'date') {
    return (
      <div className="col-span-1">
        <label for="date" className="block text-xs font-medium text-gray-700 mb-1">
          {props.placeholder}
        </label>
        <CalendarInput
          inputClassName="w-full border p-4 border-[#e2e8f0] rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          value={props.value}
          onChange={(value) => {
            props.handleChange({ name: 'date', value });
          }}
        />
      </div>
    );
  }

  if (props.field === 'notes') {
    return (
      <div className="col-span-2">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          {props.label} {props.required ? '*' : ''}
        </label>
        <textarea
          name="notes"
          placeholder="Additional context, invoice numbers, or observations..."
          value={props.value}
          onChange={({ target }) => props.handleChange({ name: props.field, value: target.value })}
          className="w-full border border-[#e2e8f0] rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 text-xs"
          rows="3"
        />
      </div>
    );
  }

  return (
    <div className="col-span-1">
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {props.label} {props.required ? '*' : ''}
      </label>
      <Input
        type={props.type}
        name={props.field}
        placeholder={props.placeholder}
        value={props.value}
        onChange={({ target }) => props.handleChange({ name: props.field, value: target.value })}
        className="w-full border border-[#e2e8f0] rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
        required={props.required}
      />
    </div>
  );
};

const ManualEntrySection = () => {
  const dispatch = useDispatch();
  const { template, formData, isLoading } = useSelector((state) => state.uploadPage.value.manualEntry);

  const handleChange = ({ name, value }) => {
    dispatch(setManualEntryFormData({ name, value }));
  };

  const handleChangeTemplate = (event) => {
    dispatch(setManualEntryTemplate(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setManualEntryLoading(true));
    const filledDate = formData[template];
    const requestItem = Object.keys(filledDate).reduce((acc, key) => {
      acc[key] = fieldValidators?.[key]?.(filledDate?.[key])?.value || {};
      return acc;
    }, {});
    requestItem.date = new Date().getTime();
    const requestBody = { client: CLIENT_ID, data: [requestItem] };
    await postResource(TEMPLATES[template].POST_API, removeEmpty(requestBody, true));
    dispatch(setManualEntryLoading(false));
  };

  const fields = TEMPLATES?.[template]?.FIELDS;
  const labels = TEMPLATES?.[template]?.FIELDS_LABELS;
  const placeholders = TEMPLATES?.[template]?.PLACEHOLDER;
  const mandatory = TEMPLATES?.[template]?.MANDATORY;
  const fieldTypes = TEMPLATES?.[template]?.TYPES;

  return (
    <div className="mt-3 p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">Add Cost Entry</h2>
      </div>
      <p className="text-xs text-gray-500 mb-6">Manually enter individual cost items or data extracted from PDF bills</p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Template */}
        <div className="col-span-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">Template *</label>
          <select
            name="template"
            value={template}
            onChange={handleChangeTemplate}
            className="w-full border border-[#e2e8f0] rounded-[11px] px-2 py-2 focus:ring-2 focus:ring-blue-500 text-[12px]"
            required
          >
            <option value="">Select category</option>
            {Object.keys(TEMPLATES)
              .map((key) => ({ label: TEMPLATES[key].LABEL, key }))
              .map((template) => (
                <option key={template.key} value={template.key}>
                  {template.label}
                </option>
              ))}
          </select>
        </div>

        {template ? (
          fields.map((field, index) => {
            return (
              <RenderField
                key={`${template}-${field}-${index}`}
                type={fieldTypes[index]}
                field={field}
                required={mandatory[index]}
                label={labels[index]}
                value={formData[template][field]}
                handleChange={handleChange}
                placeholder={placeholders[index]}
              />
            );
          })
        ) : (
          <div className="col-span-2 block text-xs font-medium text-gray-700 text-center mt-8">Select template to continue</div>
        )}

        {/* Submit Button */}
        {template ? (
          <div className="col-span-2 flex align-center justify-center">
            <Button
              isLoading={isLoading}
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-xs px-4"
            >
              <Plus size={18} /> Add Cost Entry
            </Button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default ManualEntrySection;
