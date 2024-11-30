import { EventInfoProps, SubmitButtonProps, SaveButtonProps, CloseButtonProps, DeleteButtonProps } from '../../constant/type'

export function TodayButton() {
  return (
    <button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-10 h-10 text-red-600" viewBox="0 0 16 16">
        <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2"/>
        <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a13 13 0 0 1 1.313-.805h.632z"/>
        </svg>
    </button>
  )
}

export function CalendarButton() {
  return (
    <button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-10 h-10 text-red-600" viewBox="0 0 16 16">
        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
        </svg>
    </button>
  )
}

export function TaskButton({ id, title, label, onOpen, onCheck }) {
  return (
    <button onClick={() => onOpen(id)} className="btn-task">
      <input
        type="checkbox"
        id={`check-${id}`}
        data-id={id}
        onChange={onCheck}
        onClick={(e) => e.stopPropagation()}
        className="task-checkbox medium-checkbox"
      />
      <label className="task-label text-xl" htmlFor={`check-${id}`}>
        {title}
      </label>
      <div className="tag">{label}</div>
    </button>
  )
};

export function EventContent({ eventInfo, task, onTaskOpen, onTaskCheck }: EventInfoProps) {
  return (
    <div className="task-container">
      <button
        onClick={() => onTaskOpen(task.id.toString())}
        className="btn-task"
      >
        <input
          type="checkbox"
          id={`check${task.id}`}
          data-id={task.id}
          onChange={onTaskCheck}
          onClick={(e) => e.stopPropagation()}
          className="task-checkbox small-checkbox"
        />
        <label
          htmlFor={`check${task.id}`}
          className="task-label text-lg"
        >
          {eventInfo.event.title}
        </label>
      </button>
    </div>
  );
};

export function SubmitButton({ isFormEmpty }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isFormEmpty}
      className={`${isFormEmpty ? 'btn-submit-deact' : 'btn-submit'}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className={`${isFormEmpty ? 'icon-submit-deact' : 'icon-submit'}`}
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
      </svg>
    </button>
  );
}

export function SaveButton({ isChangeValid }: SaveButtonProps) {
  return (
    <button
        type='submit'
        className={`${isChangeValid ? 'btn-title-bar' : 'btn-title-bar-deact'}`}
    >
        Save
    </button>
  )
}

export function CloseButton({ handleClose }: CloseButtonProps) {
  return (
    <button
        onClick={handleClose}
        className='btn-title-bar'
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
        </svg>
    </button>
  )
}

export function DeleteButton({ handleDelete }: DeleteButtonProps) {
  return (
    <button
        type='button'
        onClick={handleDelete}
        className='btn-delete'
    >
        Delete
    </button>
  )
}