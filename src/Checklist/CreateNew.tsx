export default function CreateNew() {
  return (
    <div>
      <form>
        <div className="fixed bottom-0 left-0 w-full bg-gray-600 rounded-lg">
            <div className="flex flex-col">
              <input type='text' placeholder="Task Name" className="bg-gray-600 m-2 text-xl"></input>
              <input type='text' placeholder="Description" className="bg-gray-600 m-2"></input>
            </div>
            <div className="flex flex-row justify-stretch">
                <button className="border p-2 m-1 rounded-md">Today</button>
                <button className="border p-2 m-1 rounded-md">Priority</button>
                <button className="border p-2 m-1 rounded-md">Labels</button>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="text-3xl mb-4 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-9 w-9 text-red-600" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
              </svg>
              </button>
            </div>
        </div>
      </form>
    </div>
  )
}
