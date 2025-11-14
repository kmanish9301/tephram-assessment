interface ChecklistProps {
  items: string[];
  selectedItems: string[];
  onChange: (selected: string[]) => void;
}
function Checklist({ items, selectedItems, onChange }: ChecklistProps) {
  function toggleItem(item: string) {
    if (selectedItems.includes(item)) {
      onChange(selectedItems.filter((i) => i !== item));
    } else {
      onChange([...selectedItems, item]);
    }
  }
  return (
    <div className="border rounded p-4 my-6 bg-gray-50">
      <h3 className="font-semibold mb-2">Disassembly Checklist</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            className={`
              px-3 py-1 rounded-full border text-sm
              ${
                selectedItems.includes(item)
                  ? "bg-red-200 border-red-500"
                  : "bg-white border-gray-300"
              }
            `}
            onClick={() => toggleItem(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
export default Checklist;
