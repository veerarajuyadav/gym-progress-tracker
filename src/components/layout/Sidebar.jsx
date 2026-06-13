import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">
      <h1 className="text-2xl font-bold text-green-500">
        Gym Tracker
      </h1>

      <nav className="mt-8 space-y-4 flex flex-col">
        <Link
          to="/"
          className="hover:text-green-500"
        >
          Dashboard
        </Link>

        <Link
          to="/body-weight"
          className="hover:text-green-500"
        >
          Body Weight
        </Link>

        <Link
          to="/workouts"
          className="hover:text-green-500"
        >
          Workouts
        </Link>

        <Link
          to="/progress"
          className="hover:text-green-500"
        >
          Progress
        </Link>

        <Link
          to="/records"
          className="hover:text-green-500"
        >
          Records
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;