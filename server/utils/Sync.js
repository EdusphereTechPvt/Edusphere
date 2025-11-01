const mongoose = require("mongoose");

/**
 * Syncs Mongoose model references bidirectionally (save/remove) with optional filters.
 *
 * @param {Object} params
 * @param {"save"|"remove"} params.action - Whether to add or remove references
 * @param {string} params.targetModel - Name of the model being referenced
 * @param {string} params.targetId - ID of the referenced document
 * @param {Object} [params.filters] - Optional object mapping model names to Mongo filters
 * @param {mongoose.ClientSession} [params.session] - Optional MongoDB session
 */
const syncReferences = async ({ action, targetModel, targetId, filters = {}, session }) => {
  if (!mongoose.Types.ObjectId.isValid(targetId)) return;

  const allModels = mongoose.modelNames();

  for (const modelName of allModels) {
    const Model = mongoose.model(modelName);
    const schemaPaths = Model.schema.paths;

    for (const [path, schemaType] of Object.entries(schemaPaths)) {
      const opts = schemaType?.options || {};
      const isArrayRef = schemaType?.$embeddedSchemaType?.options?.ref;

      const refModel = opts.ref || isArrayRef;
      if (refModel !== targetModel) continue;

      const isArrayField =
        Array.isArray(schemaType?.options?.type) ||
        !!schemaType?.$isMongooseDocumentArray;

      const update = {};
      if (isArrayField) {
        if (action === "remove") update.$pull = { [path]: targetId };
        else if (action === "save") update.$addToSet = { [path]: targetId };
      } else {
        if (action === "remove") update.$unset = { [path]: "" };
        else if (action === "save") update.$set = { [path]: targetId };
      }

      // Skip if no valid update constructed
      if (!Object.keys(update).length) continue;

      const filter = filters[modelName] || {};
      await Model.updateMany(filter, update, { session });
    }
  }
};

module.exports = { syncReferences };
