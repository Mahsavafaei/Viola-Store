import toast, { Toaster } from 'react-hot-toast';



function ToastAlert() {

    const notify = () => toast('Here is your toast.');

    
  return (
    <div>ToastAlert</div>
  )
}

export default ToastAlert