interface ConfirmModalProps {
  action: "repair" | "assemble" | null;
  elements: string[];
  onConfirm: () => void;
  onCancel: () => void;
}
function ConfirmModal({
  action,
  elements,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="font-bold mb-4">Confirm Status</h2>
        <p>
          Update status of Element Part IDs{" "}
          <span className="font-semibold">{elements.join(", ")}</span>
          {action === "repair"
            ? " to 'Ready for Repair'"
            : " to 'Ready for Assembly'"}
        </p>
        <div className="flex gap-4 mt-8 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded font-semibold"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmModal;
