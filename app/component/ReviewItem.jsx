// components/ReviewItem.jsx
export default function ReviewItem({ user, comment, createdAt }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-800">{user}</span>
          <span className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-gray-700">{comment}</p>
      </div>
    );
  }
  