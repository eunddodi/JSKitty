const BASE_URL =
  'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

const CatApi = {
  async fetchData(nodeId) {
    const res = await fetch(`${BASE_URL}/${nodeId || ''}`);
    return res.json();
  },
};

export default CatApi;
