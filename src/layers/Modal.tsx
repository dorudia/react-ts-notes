import classes from './Modal.module.css'

type Props = { children: React.ReactNode }

const Modal: React.FC<Props> = (props) => {

  return (
    <div className={classes.modalWrapper}>
      <div className={classes.modal}>
        {props.children}
      </div>
    </div>
  )
}

export default Modal