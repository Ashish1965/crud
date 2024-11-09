import initDB from "@/helpers/initDB";
import Task from "@/model/Task";
import Jwt from "jsonwebtoken";

initDB();
export default async function handler(req, res) {
  if (req.method === "GET") {
    await getUserSpecificTasks(req, res);
  } else if (req.method === "POST") {
    await saveTask(req, res);
  } else if (req.method === "DELETE") {
    await deleteTask(req, res);
  } else if (req.method === "PATCH") {
    await editTask(req, res);
  }
}

async function getUserSpecificTasks(req, res) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must logged-in" });
  }
  try {
    const { id } = Jwt.verify(authorization, process.env.JWT_SECRET);
    const result = await Task.find({ user: id });
    // console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
}
async function deleteTask(req, res) {
  try {
    const { Id } = req.body;
    const result = await Task.findByIdAndDelete({ _id: Id });
    // console.log(result);
    res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (err) {
    console.log(err);
  }
}
async function saveTask(req, res) {
  const { Name, Email, Mobile, Designation, Gender, Course, MediaUrl } = req.body;
  const { authorization } = req.headers;
  // console.log(authorization);
  console.log(Designation);
  if (!authorization) {
    return res.status(401).json({ error: "You must logged-in" });
  }
  try {
    if (!Name || !Email || !Mobile || !Designation || !Gender || !Course || !MediaUrl) {
      return res.status(422).json({ error: "Please Add all the fields" });
    }
    const { id } = Jwt.verify(authorization, process.env.JWT_SECRET);
    // console.log(id);
    const task = await new Task({
      user: id,
      name : Name,
      email : Email,
      mobile : Mobile,
      designation : Designation,
      gender : Gender,
      course : Course,
      mediaUrl : MediaUrl
    }).save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
    console.log(err);
  }
}

async function editTask(req, res) {
  const {TaskId , Name, Email, Mobile, Designation, Gender, Course, MediaUrl } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: TaskId },
      {
        name : Name, 
        email : Email,
        mobile : Mobile,
        designation : Designation,
        gender : Gender,
        course : Course,
        mediaUrl : MediaUrl
      }
    );
    // console.log(task);

    res.status(201).json({ message: "Task Updated Successfully" });
  } catch (err) {
    console.log(err);
  }
}
