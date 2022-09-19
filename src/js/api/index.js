const BASE_URL =
  'https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev';

const CatApi = {
  async fetchData(nodeId) {
    try {
      const res = await fetch(`${BASE_URL}/${nodeId || ''}`);
      if (!res.ok) {
        throw new Error('Server Error');
      }
      return res.json();
    } catch (e) {
      throw new Error(`${e.message}`);
    }
  },
};

export default CatApi;
