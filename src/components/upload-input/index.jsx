const UploadInput = (props) => {
  return (
    <div className="border-2 border-dashed border-[#e2e8f0] border-border rounded-xl p-12 text-center hover:bg-[#eff2f780] hover:border-[#0066ff]/50 transition-all cursor-pointer">
      {props.icon}
      <p className="mt-4 text-gray-700 font-medium">{props.title}</p>
      <p className="text-sm text-gray-500 mb-4">
        or click to browse from your computer
      </p>

      {/* File Input */}
      <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
        <span>Choose File</span>
        <input
          type="file"
          accept=".csv,.xls,.xlsx"
          className="hidden"
          onChange={props.handleFileChange}
        />
      </label>

      {/* Show selected file */}
      {props.fileName && (
        <p className="mt-3 text-sm text-gray-600">Selected: {props.fileName}</p>
      )}
    </div>
  );
};
export default UploadInput;
