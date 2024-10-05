import { Input } from "@/components/ui/input";

function CommonFormElement({ currentItem, value, onChange }) {
  let content = null;
  switch (currentItem.componentType) {
    case "input":
      content = (
        <Input
          className="text-black w-[15vw]"
          name={currentItem.name}
          id={currentItem.name}
          placeholder={currentItem.placeholder}
          value={value}
          onChange={onChange}
            type={currentItem.type}
        />
      );

      break;
    default:
      content = (
        <Input
          className="text-black w-[15vw]"
          name={currentItem.name}
          id={currentItem.name}
          placeholder={currentItem.placeholder}
          value={value}
          onChange={onChange}
            
        />
      );

      break;
  }
  return content;
}


export default CommonFormElement;