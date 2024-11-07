export default function CreateNew() {
  return (
    <div>
      <form>
        <div>
            <input type='text' placeholder="Task Name"></input>
            <input type='text' placeholder="Description"></input>
            <div>
                <button>Today</button>
                <button>Priority</button>
                <button>Labels</button>
            </div>
            <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
