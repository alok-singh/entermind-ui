import { Loader } from 'lucide-react';

const UploadInput = (props) => {
  return (
    <div className="border-2 border-dashed border-[#e2e8f0] border-border rounded-xl p-12 text-center hover:bg-[#eff2f780] hover:border-[#0066ff]/50 transition-all cursor-pointer relative ">
      {props.isLoading && (
        <div className="flex items-center justify-center w-full absolute top-0 bottom-0 left-0 right-0 h-auto bg-[#ffffffdf]">
          <Loader className="animate-spin" />
        </div>
      )}
      {props.icon}
      <p className="mt-4 text-gray-700 font-medium">{props.title}</p>
      <p className="text-sm text-gray-500 mb-4">or click to browse from your computer</p>

      {/* File Input */}
      <label className="inline-flex items-center px-4 py-2 bg-[#007aff] text-white font-semibold rounded cursor-pointer">
        <span>Choose File</span>
        <input type="file" accept={props.accept} className="hidden" onChange={props.handleFileChange} multiple={props.multiple} />
      </label>

      {/* Show selected file */}
      {props.fileName && <p className="mt-3 text-sm text-gray-600">Selected: {props.fileName}</p>}
    </div>
  );
};
export default UploadInput;
