import { DollarSign, Plus } from "lucide-react";
import { useState } from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import { CATEGORIES, CLIENT_ID, POST_COST_URL } from "../../config/vars";
import { fieldValidators } from "../../utils/field-validators.util";
import { postResource } from "../../utils/http.util";

const ManualEntrySection = () => {
  const [formData, setFormData] = useState({
    vendor: "AWS",
    subcategory: "",
    category: "GPT-4",
    amount: 3000,
    units: 100,
    tags: "some tags",
    project: "project A",
    notes: "notes",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestItem = Object.keys(formData).reduce((acc, key) => {
      acc[key] = fieldValidators?.[key]?.(formData?.[key])?.value || {};
      return acc;
    }, {});
    requestItem.date = (new Date()).getTime();
    const requestBody = { client: CLIENT_ID, data: [requestItem] };
    await postResource(POST_COST_URL, requestBody);
  };

  return (
    <div className="mt-3 p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">Add Cost Entry</h2>
      </div>
      <p className="text-xs text-gray-500 mb-6">
        Manually enter individual cost items or data extracted from PDF bills
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Vendor */}
        <div className="col-span-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Vendor/Provider *
          </label>
          <Input
            type="text"
            name="vendor"
            placeholder="e.g., OpenAI, AWS, Azure"
            value={formData.vendor}
            onChange={handleChange}
            className="w-full border border-[#e2e8f0] rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Category */}
        <div className="col-span-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-[#e2e8f0] rounded px-2 py-2 focus:ring-2 focus:ring-blue-500 text-[12px]"
            required
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        <div className="col-span-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Subcategory/Service *
          </label>
          <Input
            type="text"
            name="subcategory"
            placeholder="e.g., GPT-4 API Calls, Lambda Functions"
            value={formData.subcategory}
            onChange={handleChange}
            className="w-full border border-[#e2e8f0] rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Amount */}
        <div className="col-span-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Amount (USD) *
          </label>
          <Input
            type="number"
            name="amount"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-[#e2e8f0] rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Usage Units */}
        <div className="col-span-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Usage Units
          </label>
          <Input
            type="number"
            name="units"
            placeholder="e.g., 2.5M tokens, 850 hours"
            value={formData.units}
            onChange={handleChange}
            className="w-full border border-[#e2e8f0] rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Project */}
        <div className="col-span-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Project/Department
          </label>
          <Input
            type="text"
            name="project"
            placeholder="e.g., Customer Service, Sales AI"
            value={formData.project}
            onChange={handleChange}
            className="w-full border border-[#e2e8f0] rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tags */}
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Tags (comma-separated)
          </label>
          <Input
            type="text"
            name="tags"
            placeholder="e.g., production, Q1-2025, high-priority"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border border-[#e2e8f0] rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Notes */}
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            placeholder="Additional context, invoice numbers, or observations..."
            value={formData.notes}
            onChange={handleChange}
            className="w-full border border-[#e2e8f0] rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 text-xs"
            rows="3"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex align-center justify-center">
          <Button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-xs px-4"
          >
            <Plus size={18} /> Add Cost Entry
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ManualEntrySection;
