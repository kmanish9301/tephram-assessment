import { useEffect, useMemo, useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredIds = useMemo(() => {
    return ids.filter((id) =>
      id.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [ids, debouncedSearch]);

  return (
    <div>
      <h3 className="font-semibold mb-4">Available Electrolyzers ID</h3>
      <input
        type="text"
        placeholder="Search electrolyzer..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-red-400"
      />

      <ul className="space-y-2">
        {filteredIds.length === 0 && (
          <li className="text-sm text-gray-500 text-center">
            No electrolyzer found
          </li>
        )}

        {filteredIds.map((id: string) => (
          <li key={id}>
            <button
              className={`w-full py-2 rounded font-medium transition ${
                selectedId === id
                  ? "bg-red-400 text-white shadow"
                  : "bg-gray-300 text-gray-900 hover:bg-gray-400"
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
