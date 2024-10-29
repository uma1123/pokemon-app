interface CardProps {
  id: number;
  name: string;
  image: string;
  type: string;
  className?: string;
}

export default function Card({ id, name, image, type, className }: CardProps) {
  return (
    <div
      className={` ${className} flex flex-col items-center justify-center py-6 m-1 border-solid border-gray-300 rounded-md min-w-40 text-center shadow-md shadow-black relative cursor-pointer transform transition-transform duration-300 hover:scale-110`}
    >
      <div className="rounded-2xl py-2 px-1 bg-white bg-opacity-30">
        <small>{id}</small>
      </div>
      <img src={image} alt={name} className="w-[120px] h-[120px]" />
      <div className="">
        <h4>{name}</h4>
        <h3 className="mb-1">{type}</h3>
      </div>
    </div>
  );
}
