import React, { FormEvent, useState } from "react";
import "./AddMissionForm.css";
import { Mission, MissionStatus, Priority } from "../../types/mission";
interface AddMissionFormProps {
  handleSubmitFunc: (mission: Mission) => void;
}

const defaultDataObj: Mission = {
  name: "",
  status: MissionStatus.Pending,
  priority: Priority.Low,
  description: "",
};

const AddMissionForm: React.FC<AddMissionFormProps> = ({
  handleSubmitFunc,
}) => {
  const [formData, setFormData] = useState<Mission>(defaultDataObj);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function localHandleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) return;
    handleSubmitFunc(formData);
    setFormData(defaultDataObj);
  }

  return (
    <form className="AddMissionForm" onSubmit={localHandleSubmit}>
      <input
        type="text"
        name="name"
        required
        placeholder="Enter name:"
        onChange={handleChange}
        value={formData.name}
      />
      <select name="missionStatus" required onChange={handleChange}>
        {Object.keys(MissionStatus).map((key, idx) => (
          <option key={"statusOpt" + idx} value={key}>
            {key}
          </option>
        ))}
      </select>
      <select name="missionStatus" required onChange={handleChange}>
        {Object.keys(Priority).map((key, idx) => (
          <option key={"priorityOpt" + idx} value={key}>
            {key}
          </option>
        ))}
      </select>
      <textarea
        name="description"
        required
        placeholder="description:"
        onChange={handleChange}
        value={formData.description}
      />
      <button type="submit">Add Mission</button>
    </form>
  );
};

export default AddMissionForm;
