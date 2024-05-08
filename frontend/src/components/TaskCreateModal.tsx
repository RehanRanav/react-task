import { FC, useContext, useRef, useState } from "react";
import { Modal } from "flowbite-react";
import { PiWarningDiamondFill } from "react-icons/pi";
import { TaskModalProps } from "../../definition";
import { CustomFlowbiteTheme } from "flowbite-react";
import { dateValidation } from "../utils/validation";
import { addNewProjectTask } from "../utils/api";
import { Context } from "../context/Context";
import { Spinner } from "./skeletons/Spinner";
import toast from "react-hot-toast";

const customeTheme: CustomFlowbiteTheme["modal"] = {
  root: {
    base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    show: {
      on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
      off: "hidden",
    },
    sizes: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
    },
    positions: {
      "top-left": "items-start justify-start",
      "top-center": "items-start justify-center",
      "top-right": "items-start justify-end",
      "center-left": "items-center justify-start",
      center: "items-center justify-center",
      "center-right": "items-center justify-end",
      "bottom-right": "items-end justify-end",
      "bottom-center": "items-end justify-center",
      "bottom-left": "items-end justify-start",
    },
  },
  content: {
    base: "relative h-full w-full p-4 md:h-auto",
    inner:
      "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
  body: {
    base: "flex-1 overflow-auto p-6",
    popup: "pt-0",
  },
  header: {
    base: "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
    popup: "border-b-0 p-2",
    title: "text-xl font-medium text-gray-900 dark:text-white",
    close: {
      base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      icon: "h-5 w-5",
    },
  },
  footer: {
    base: "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
    popup: "border-t",
  },
};

const TaskCreateModal: FC<TaskModalProps> = ({
  openModal,
  setOpenModal,
  projectId,
}) => {
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [disableBtn, setDisableBtn] = useState(false);
  const [taskStatus, setTaskStatus] = useState("Pending");
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const assigneeRef = useRef<HTMLInputElement | null>(null);
  const { setAllTasks } = useContext(Context);

  const createNewTask = async () => {
    const titleValue = titleRef.current?.value.trim();
    const descriptionValue = descriptionRef.current?.value.trim();
    const dateValue = dateRef.current?.value;
    const assigneesValue = assigneeRef.current?.value.trim();
    if (
      titleValue === "" ||
      descriptionValue === "" ||
      dateValue === "" ||
      assigneesValue === ""
    ) {
      if (titleValue === "") {
        setFieldError("titleError");
        setError("Please fill Task Title fields");
      } else if (descriptionValue === "") {
        setFieldError("descriptionError");
        setError("Please fill task Description fields");
      } else if (dateValue === "") {
        setFieldError("dateError");
        setError("Please fill Task Due date fields");
      } else if (assigneesValue === "") {
        setFieldError("assigneesError");
        setError("Please fill Task assignees fields");
      }
      setDisableBtn(false);
      return;
    }
    if (dateValue) {
      const res = dateValidation(dateValue);
      if (!res) {
        setFieldError("dateError");
        setError("Please fill Valid task Due Date");
        return;
      }
    }
    setDisableBtn(true);
    const assignees = assigneeRef.current;
    const assigneesList = assignees?.value
      .split(",")
      .map((assignee) => assignee.trim())
      .filter((assignee) => assignee !== "");
    if (assigneesList && assigneesList?.length > 0) {
      const data = {
        title: titleValue as string,
        description: descriptionValue as string,
        status: taskStatus,
        assignees: assigneesList as string[],
        dueDate: dateValue as string,
      };
      const response = await addNewProjectTask(projectId, data);
      if (response) {
        setAllTasks((prevTasks) => [...prevTasks, response]);
        closeModal();
        toast.success("Task created successfully");
      }
    } else {
      setFieldError("assigneesError");
      setError("Add Team Assignees");
      setDisableBtn(false);
      return;
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setError(null);
    setDisableBtn(false);
    setFieldError(null);
    setTaskStatus("Pending");
  };

  return (
    <Modal
      dismissible
      initialFocus={titleRef}
      show={openModal}
      onClose={closeModal}
      size={"xl"}
      theme={customeTheme}
    >
      <Modal.Header>Create Task</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="relative pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
              Required fields are marked with an asterisk{" "}
            </span>
          </div>
          {error ? (
            <div className="flex items-center gap-2 text-red-600 text-xs">
              <PiWarningDiamondFill />
              <span>{error}</span>
            </div>
          ) : null}
          <div className="flex flex-col gap-2">
            <label className="relative w-fit pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
              Task Title
            </label>
            <input
              type="text"
              required
              ref={titleRef}
              className={`rounded-sm border-2 outline-none appearance-none ${
                fieldError === `titleError` ? "border-red-400" : "border-black"
              }`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="relative w-fit pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
              Task Description
            </label>
            <textarea
              ref={descriptionRef}
              className={`rounded-sm border-2 outline-none appearance-none ${
                fieldError === `descriptionError`
                  ? "border-red-400"
                  : "border-black"
              }`}
            ></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label className="relative w-fit pr-4 text-sm">Status</label>
            <select
              className="rounded-sm border-2 border-black outline-none appearance-none bg-white px-8 py-2 w-fit"
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="relative w-fit pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
              Due Date
            </label>
            <input
              ref={dateRef}
              type="date"
              required
              className={`rounded-sm border-2 outline-none w-fit ${
                fieldError === `dateError` ? "border-red-400" : "border-black"
              }`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="relative w-fit pr-4 text-sm after:content-['*'] after:block after:absolute after:-top-1 after:right-0 after:text-red-600">
              Add Team
            </label>
            <span className="w-fit pr-4 text-[10px] text-gray-600">
              <b>Note: </b>
              {" (Please separate multiple names with commas (,))"}
            </span>
            <input
              ref={assigneeRef}
              type="text"
              className={`rounded-sm border-2 outline-none appearance-none ${
                fieldError === `assigneesError`
                  ? "border-red-400"
                  : "border-black"
              }`}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="w-full flex gap-4 justify-end">
          <button
            className="bg-transparent hover:underline border-none"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="mt-2 w-fit p-2 text-sm border border-black box-border rounded-md hover:cursor-pointer bg-black text-white font-semibold"
            onClick={createNewTask}
            disabled={disableBtn}
          >
            {disableBtn ? <Spinner /> : `Add Task`}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskCreateModal;
