import { theme } from "../theme";

export default function Card({ title, desc, to, icon: Icon, delay }) {
  return (
    <a
      href={to}
      className={`${theme.glass.card} ${theme.glass.cardHover} p-6 ${delay || ''} transform transition-all duration-300 hover:shadow-2xl active:scale-95`}
    >
      {Icon && (
        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-600 rounded-lg flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110">
          <Icon className="w-6 h-6 text-white" />
        </div>
      )}
      <h2 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">{title}</h2>
      <p className="text-gray-300 mt-2">{desc}</p>
    </a>
  );
}