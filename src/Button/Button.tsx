export default function NewTaskButton({ isActive, onShow }) {
  return (
      <div className="new-task-container">
          <button className='btn-new-task' onClick={onShow}>+</button>
      </div>
  )
}