import { Tooltip } from "flowbite-react";
import { ReactComponent as Plus } from "../asset/Plus.svg";

function Input({ onClick, task }) {
  return (
    <>
      <div className="flex w-[368px] justify-between mt-12 bg-[#F9F9FA] h-[37px] border rounded border-[#E5E5E5]">
        <p className="font-normal leading-[16px] text-[12px] font-[Segoe UI] tracking-[1px] p-2">
          TASKS {task.length}
        </p>
        <span className="border-l border-[#E5E5E5] p-2" onClick={onClick}>
          <Tooltip content="New Task">
            <Plus />
          </Tooltip>
        </span>
      </div>
    </>
  );
}

export default Input;
