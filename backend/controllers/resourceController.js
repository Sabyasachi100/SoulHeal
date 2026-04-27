const Resource = require("../models/Resource");

// @desc    Add wellness resource
// @route   POST /api/resources
// @access  Private (Admin)
const addResource = async (req, res) => {
  const { title, description, type, url, category } = req.body;

  try {
    const resource = await Resource.create({
      title,
      description,
      type,
      url,
      category,
      addedBy: req.user._id,
    });
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all resources
// @route   GET /api/resources
// @access  Private
const getResources = async (req, res) => {
  try {
    const resources = await Resource.find({});
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private (Admin)
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (resource) {
      await resource.deleteOne();
      res.json({ message: "Resource removed" });
    } else {
      res.status(404).json({ message: "Resource not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addResource, getResources, deleteResource };
