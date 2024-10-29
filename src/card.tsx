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
      className={` ${className} flex flex-col items-center justify-center py-6 m-1 border-solid border-gray-300 rounded-md min-w-40 text-center shadow-md shadow-black delay-300 relative cursor-pointer`}
    >
      <div className="">
        <small>{id}</small>
      </div>
      <img src={image} alt={name} className="w-[120px] h-[120px]" />
      <div className="">
        <h4>{name}</h4>
        <h5>{type}</h5>
      </div>
    </div>
  );
}
