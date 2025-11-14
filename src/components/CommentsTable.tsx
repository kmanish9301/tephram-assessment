interface CommentsTableProps {
  elements: string[];
  comments: { [key: string]: string };
  setComments: (comments: { [key: string]: string }) => void;
}
function CommentsTable({
  elements,
  comments,
  setComments,
}: CommentsTableProps) {
  return (
    <div className="my-6">
      <h4 className="font-semibold mb-2">Comments</h4>
      <table className="w-full border bg-white rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Element Part ID</th>
            <th className="p-2 border">Comments</th>
          </tr>
        </thead>
        <tbody>
          {elements.map((id) => (
            <tr key={id}>
              <td className="p-2 border">{id}</td>
              <td className="p-2 border">
                <input
                  type="text"
                  className="w-full p-1 border rounded"
                  value={comments[id] || ""}
                  onChange={(e) =>
                    setComments({ ...comments, [id]: e.target.value })
                  }
                  placeholder="Write your comment"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default CommentsTable;
