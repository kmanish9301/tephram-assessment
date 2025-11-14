import { useState } from "react";
import Checklist from "./components/Checklist";
import CommentsTable from "./components/CommentsTable";
import ConfirmModal from "./components/ConfirmModal";
import ElectrolyzerList from "./components/ElectrolyzerList";
import ElementList from "./components/ElementList";
import Header from "./components/Header";

import {
  checklistItems,
  electrolyzerIds,
  elementsByElectrolyzer,
} from "./data/mockData";

type StatusType = "repair" | "assemble" | null;

const App = () => {
  const [selectedElectrolyzer, setSelectedElectrolyzer] = useState("");
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [selectedChecklist, setSelectedChecklist] = useState<string[]>([]);
  const [action, setAction] = useState<StatusType>(null);
  const [showPopup, setShowPopup] = useState(false);

  const [repairChecklistCountMap, setRepairChecklistCountMap] = useState<
    Record<string, number>
  >({});

  const [statusMap, setStatusMap] = useState<Record<string, StatusType>>({});

  function handleConfirm() {
    const updated = { ...statusMap };
    const newCountMap = { ...repairChecklistCountMap };

    selectedElements.forEach((id) => {
      updated[id] = action;

      if (action === "repair") {
        newCountMap[id] = selectedChecklist.length;
      }
    });

    setStatusMap(updated);
    setRepairChecklistCountMap(newCountMap);

    setShowPopup(false);
    setSelectedElements([]);
    setSelectedChecklist([]);
    setAction(null);
  }

  const rightPanelVisible =
    selectedElectrolyzer !== "" && selectedElements.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />

      <div className="flex flex-1">
        <div className="w-64 bg-[#ebebeb] p-6 border-r">
          <ElectrolyzerList
            ids={electrolyzerIds}
            selectedId={selectedElectrolyzer}
            onSelect={(id) => {
              setSelectedElectrolyzer(id);
              setSelectedElements([]);
              setSelectedChecklist([]);
              setAction(null);
            }}
          />
        </div>

        <div className="w-[420px] p-6 border-r overflow-y-auto">
          {selectedElectrolyzer ? (
            <ElementList
              elements={elementsByElectrolyzer[selectedElectrolyzer] || []}
              selectedElements={selectedElements}
              onSelect={setSelectedElements}
              statusMap={statusMap}
              checklistCountMap={repairChecklistCountMap}
            />
          ) : (
            <div className="text-center text-gray-500 mt-40">
              Select an Electrolyzer ID to view elements.
            </div>
          )}
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          {!rightPanelVisible && selectedElectrolyzer !== "" && (
            <div className="text-gray-600 mt-40 text-center">
              Select an Electrolyzer ID and then select one or more element part
              ID to start disassembly
            </div>
          )}

          {rightPanelVisible && (
            <>
              <Checklist
                items={checklistItems}
                selectedItems={selectedChecklist}
                onChange={setSelectedChecklist}
              />

              <CommentsTable
                elements={selectedElements}
                comments={comments}
                setComments={setComments}
              />

              <div className="flex gap-6 mt-6">
                <button
                  className="flex-1 py-3 bg-black text-white rounded-lg font-semibold"
                  onClick={() => {
                    setAction("repair");
                    setShowPopup(true);
                  }}
                >
                  Send to Repair
                </button>

                <button
                  className="flex-1 py-3 bg-gray-300 text-black rounded-lg font-semibold"
                  onClick={() => {
                    setAction("assemble");
                    setShowPopup(true);
                  }}
                >
                  Ready to Assemble
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showPopup && (
        <ConfirmModal
          action={action}
          elements={selectedElements}
          onConfirm={handleConfirm}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default App;
