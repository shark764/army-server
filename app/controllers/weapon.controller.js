const db = require('../models');
const Weapon = db.weapons;

/**
 * Create and save a Weapon
 */
exports.create = (req, res) => {
  /**
   * Validate request
   */
  if (!req.body.name) {
    res.status(400).send({ message: 'Content cannot be empty!.' });
    return;
  }

  /**
   * Create a Weapon
   */
  const weapon = new Weapon({
    ...req.body,
  });

  /**
   * Save in the database
   */
  weapon
    .save(weapon)
    .then((data) => {
      res.send({ data, message: 'Weapon was created successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'An error ocurred while creating the Weapon.',
      });
    });
};

/**
 * Retrieve all Weapons from the database.
 */
exports.findAll = (req, res) => {
  const { name } = req.query;
  const condition = name
    ? {
        name: {
          $regex: new RegExp(name),
          $options: 'i',
        },
      }
    : {};

  Weapon.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'An error ocurred while retrieving weapons.',
      });
    });
};

/**
 * Find a single Weapon with an id
 */
exports.findOne = (req, res) => {
  const { id } = req.params;

  Weapon.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Not found Weapon with id ${id}` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Weapon with id=${id}.`,
      });
    });
};

/**
 * Update a Weapon by the id in the request
 */
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const { id } = req.params;

  Weapon.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Weapon with id=${id}. Maybe Weapon was not found!`,
        });
      } else {
        res.send({ data, message: 'Weapon was updated successfully.' });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Weapon with id=' + id,
      });
    });
};

/**
 * Delete a Weapon with the specified id in the request
 */
exports.delete = (req, res) => {
  const { id } = req.params;

  Weapon.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Weapon with id=${id}. Maybe Weapon was not found!`,
        });
      } else {
        res.send({
          message: 'Weapon was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Weapon with id=' + id,
      });
    });
};

/**
 * Delete all Weapons from the database.
 */
exports.deleteAll = (req, res) => {
  Weapon.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Weapons were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all weapons.',
      });
    });
};
