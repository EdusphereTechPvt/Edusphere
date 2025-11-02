export default function StatCard({ title, value, color }) {
    return (
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-start">
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <p
            className={`text-2xl font-bold mt-2 ${
                color ? color : "text-gray-900"
            }`}
            >
            {value}
            </p>
        </div>
    );
}