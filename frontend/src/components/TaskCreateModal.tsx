import { FC, useContext, useRef, useState } from "react";
import { CustomFlowbiteTheme, Dropdown, Modal } from "flowbite-react";
import { PiWarningDiamondFill } from "react-icons/pi";
import { TaskModalProps } from "../../definition";
import { dateValidation } from "../utils/validation";
import { addNewProjectTask } from "../utils/api";
import { Context } from "../context/Context";
import { Spinner } from "./skeletons/Spinner";
import toast from "react-hot-toast";

const customeTheme: CustomFlowbiteTheme["dropdown"] = {
  inlineWrapper:
    "flex items-center w-fit justify-between border-2 rounded-sm border-black py-2 px-4",
  floating: {
    item: {
      base: "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700",
    },
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
            <Dropdown
              label={taskStatus}
              className="cursor-pointer"
              inline
              theme={customeTheme}
            >
              <Dropdown.Item
                onClick={() => setTaskStatus("In Progress")}
                className="p-2 flex gap-1 items-center hover:bg-black hover:text-white"
              >
                In Progress
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setTaskStatus("Pending")}
                className="p-2 flex gap-1 items-center hover:bg-black hover:text-white"
              >
                Pending
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setTaskStatus("Completed")}
                className="p-2 flex gap-1 items-center hover:bg-black hover:text-white"
              >
                Completed
              </Dropdown.Item>
            </Dropdown>
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
