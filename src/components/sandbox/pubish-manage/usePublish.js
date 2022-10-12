import axios from "axios";
import { useEffect, useState } from "react";
function usePublish(type) {
  const { username } = JSON.parse(localStorage.getItem("token"));
  const [dataSource, setdataSource] = useState([]);
  useEffect(() => {
    axios
      .get(`/news?author=${username}&publishState=${type}&_expand=category`)
      .then((res) => {
        setdataSource(res.data);
      });
  }, [username, type]);
  const handleUnpublished = (id) => {
    setdataSource(dataSource.filter((data) => data.id !== id));
    axios.patch(`/news/${id}`, {
      publishState: 2,
      publishTime:Date.now()
    });
  };
  const handlePublished = (id) => {
    setdataSource(dataSource.filter((data) => data.id !== id));
    axios.patch(`/news/${id}`, {
      publishState: 3,
    });
  };
  const handleSunset = (id) => {
    setdataSource(dataSource.filter((data) => data.id !== id));
    axios.delete(`/news/${id}`)
  };
  return { dataSource, handleUnpublished, handlePublished, handleSunset };
}
export default usePublish;
