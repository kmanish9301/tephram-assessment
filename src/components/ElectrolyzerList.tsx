interface ElectrolyzerListProps {
  ids: string[];
  selectedId: string;
  onSelect: (id: string) => void;
}
const ElectrolyzerList = ({
  ids,
  selectedId,
  onSelect,
}: ElectrolyzerListProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-4">Available Electrolyzers ID</h3>
      <ul className="space-y-2">
        {ids.map((id: string) => (
          <li key={id}>
            <button
              className={`w-full py-2 rounded font-medium transition ${
                selectedId === id
                  ? "bg-red-400 text-white shadow"
                  : "bg-gray-300 text-gray-900"
              }`}
              onClick={() => onSelect(id)}
            >
              {id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ElectrolyzerList;
