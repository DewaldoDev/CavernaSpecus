import snakeCase from "lodash/snakeCase";
import toUpper from "lodash/toUpper";

const identity = x => x;

const defaults = {
  hasPayload: true,
  payloadFunction: identity,
  hasMeta: false,
  metaFunction: identity,
};

const createActionCreator = (type, options) => {
  const {
    hasPayload,
    payloadFunction,
    hasMeta,
    metaFunction,
  } = Object.assign({}, defaults, options);
  let actionCreator;
  if (hasPayload) {
    if (hasMeta) {
      actionCreator = (payload, meta) => ({
        type,
        payload: payloadFunction(payload, meta),
        meta: metaFunction(meta),
      });
    } else {
      actionCreator = payload => ({ type, payload: payloadFunction(payload) });
    }
  } else {
    actionCreator = () => ({ type });
  }

  actionCreator.toString = () => type;
  actionCreator.type = type;

  return actionCreator;
};

export const createActionCreators = ({ namespace, actions }) => {
  const actionCreators = {};

  actions.forEach(({ name, ...options }) => {
    actionCreators[name] = createActionCreator(
      `${namespace}/${toUpper(snakeCase(name))}`,
      options
    );
  });

  return actionCreators;
};

export const createReducer = (transformations, initialState) =>
  (state = initialState, action) => (
    transformations[action.type]
      ? transformations[action.type](state, action.payload)
      : state
  );
