module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      name: String,
      description: String,
      type: String,
      calibre: String,
      distribution: String,
      features: String,
      imageUrl: String,
    },
    {
      timestamps: true,
    }
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Weapon = mongoose.model('weapon', schema);

  return Weapon;
};
