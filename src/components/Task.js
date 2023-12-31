import AddTask from "./AddTask";

function Task() {
  return (
    <div className="h-[100vh] flex">
      <div className="w-64 bg-[#101840] "></div>
      <main className="flex-1 bg-[#FAFBFF] float-right overflow-y-auto" >
        <nav className=" bg-white h-16"></nav>
        <div className="bg-[#FAFBFF] p-6 font-[Segoe UI]">
          <p className="text-[#31354A] text-[28px]  font-semibold">Test</p>
          <p className="text-[#3366FF] font-normal leading-[16px] text-[14px] pt-2 pb-2">
            Sloovi.com
          </p>
          <p className="text-[#767986] italic font-normal leading-[16px] text-[14px]">
            Add description
          </p>
          <AddTask />
        </div>
      </main>
    </div>
 
  );
}

export default Task;
