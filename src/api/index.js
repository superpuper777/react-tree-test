import { initializeApi, useApi, postApi } from 'fx-react';

const api = {
  user: {
    journal: {
      getSingleUrl: '/api.user.journal.getSingle',
      getSingle(id) {
        return postApi(this.getSingleUrl, null, { id: id });
      },
      useGetSingle(id, ...props) {
        return useApi(null, true, null, this.getSingle, id, ...props);
      },
      useDefGetSingle(def, id, ...props) {
        return useApi(def, true, null, this.getSingle, id, ...props);
      },
      useIfGetSingle(cond, id, ...props) {
        return useApi(null, cond, null, this.getSingle, id, ...props);
      },
      useProcGetSingle(proc, id, ...props) {
        return useApi(null, true, proc, this.getSingle, id, ...props);
      },

      getRangeUrl: '/api.user.journal.getRange',
      getRange(skip, take, filter) {
        return postApi(this.getRangeUrl, filter, { skip: skip, take: take });
      },
      useGetRange(skip, take, filter, ...props) {
        return useApi(
          null,
          true,
          null,
          this.getRange,
          skip,
          take,
          filter,
          ...props
        );
      },
      useDefGetRange(def, skip, take, filter, ...props) {
        return useApi(
          def,
          true,
          null,
          this.getRange,
          skip,
          take,
          filter,
          ...props
        );
      },
      useIfGetRange(cond, skip, take, filter, ...props) {
        return useApi(
          null,
          cond,
          null,
          this.getRange,
          skip,
          take,
          filter,
          ...props
        );
      },
      useProcGetRange(proc, skip, take, filter, ...props) {
        return useApi(
          null,
          true,
          proc,
          this.getRange,
          skip,
          take,
          filter,
          ...props
        );
      },
    },
    partner: {
      rememberMeUrl: '/api.user.partner.rememberMe',
      rememberMe(code) {
        return postApi(this.rememberMeUrl, null, { code: code });
      },
    },
    tree: {
      node: {
        createUrl: '/api.user.tree.node.create',
        create(treeName, parentNodeId, nodeName) {
          return postApi(this.createUrl, null, {
            treeName: treeName,
            parentNodeId: parentNodeId,
            nodeName: nodeName,
          });
        },

        renameUrl: '/api.user.tree.node.rename',
        rename(treeName, nodeId, newNodeName) {
          return postApi(this.renameUrl, null, {
            treeName: treeName,
            nodeId: nodeId,
            newNodeName: newNodeName,
          });
        },

        deleteUrl: '/api.user.tree.node.delete',
        delete(treeName, nodeId) {
          return postApi(this.deleteUrl, null, {
            treeName: treeName,
            nodeId: nodeId,
          });
        },
      },
      getUrl: '/api.user.tree.get',
      get(treeName) {
        return postApi(this.getUrl, null, { treeName: treeName });
      },
      useGet(treeName, ...props) {
        return useApi(null, true, null, this.get, treeName, ...props);
      },
      useDefGet(def, treeName, ...props) {
        return useApi(def, true, null, this.get, treeName, ...props);
      },
      useIfGet(cond, treeName, ...props) {
        return useApi(null, cond, null, this.get, treeName, ...props);
      },
      useProcGet(proc, treeName, ...props) {
        return useApi(null, true, proc, this.get, treeName, ...props);
      },
    },
  },
};

export default api;

initializeApi(api);
