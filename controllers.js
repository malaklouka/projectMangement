const Project =require('./models/project')
const User =  require('./models/user')

exports.updateStatusToPending = async (req, res) => {
    try {
      await Project.updateOne(
        { _id: req.params.id_task },
        { $set: { approved: true, status: "pending" } }
      );
  
      res.status(200).send({ msg: "task updated successfully" });
    } catch (error) {
      res
        .status(400)
        .send({ errors: [{ msg: "can not update this task", error }] });
    }
  };
  exports.updateStatusToDone = async (req, res) => {
    try {
      await Project.updateOne(
        { _id: req.params.id_task },
        { $set: { status: "done" } }
      );
  
      res.status(200).send({ msg: "task updated successfully" });
    } catch (error) {
      res
        .status(400)
        .send({ errors: [{ msg: "can not update this task", error }] });
    }
  };






exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.deleteOne({ _id: id });

    res.status(200).send({ msg: "deleting  succ" });
  } catch (error) {
    res
      .status(400)
      .send({ errors: [{ msg: "can not delete the currentUser" }] });
  }
};