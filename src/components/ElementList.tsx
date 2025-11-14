interface Element {
  position: number;
  id: string;
}

interface ElementListProps {
  elements: Element[];
  selectedElements: string[];
  onSelect: (ids: string[]) => void;
  statusMap: Record<string, "repair" | "assemble" | null>;
  checklistCountMap: Record<string, number>;
}

function ElementList({
  elements,
  selectedElements,
  onSelect,
  statusMap,
  checklistCountMap,
}: ElementListProps) {
  function handleCheck(id: string) {
    if (statusMap[id]) return;

    if (selectedElements.includes(id)) {
      onSelect(selectedElements.filter((e) => e !== id));
    } else {
      onSelect([...selectedElements, id]);
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="font-semibold mb-4">Element Part IDs</div>

      <div className="grid grid-cols-3 mb-3 text-sm font-semibold text-gray-700">
        <div>Position</div>
        <div>Element Part ID</div>
        <div>Select</div>
      </div>

      {elements.map((elem) => (
        <div key={elem.id} className="grid grid-cols-3 mb-2 items-center">
          <div>{elem.position}</div>

          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-lg text-sm ${
                statusMap[elem.id] === "repair"
                  ? "bg-red-500 text-white"
                  : statusMap[elem.id] === "assemble"
                  ? "bg-green-500 text-white"
                  : selectedElements.includes(elem.id)
                  ? "bg-red-300 text-white"
                  : "bg-gray-200"
              }`}
            >
              {elem.id}
            </span>

            {statusMap[elem.id] === "repair" &&
              checklistCountMap[elem.id] !== undefined && (
                <span className="text-xs bg-gray-300 px-2 py-0.5 rounded">
                  {checklistCountMap[elem.id]}
                </span>
              )}
          </div>

          <div>
            {statusMap[elem.id] ? (
              <span className="text-xs text-gray-400 italic">Done</span>
            ) : (
              <input
                type="checkbox"
                checked={selectedElements.includes(elem.id)}
                onChange={() => handleCheck(elem.id)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ElementList;
