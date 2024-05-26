import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RequestDetail = () => {
  const { id } = useParams();
  const [request, setRequest] = useState([]);

  useEffect(() => {
    const getRequestDetail = async () => {
      await axios
        .get(`http://localhost:8080/api/requests/${id}`, { withCredentials: true })
        .then((res) => {
          setRequest(res.data.request);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getRequestDetail();
  }, [id]);

  if (!request) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <h1>Request Detail</h1>
      <img src={request.requestImage} alt="Request" style={{ width: '200px', height: '200px' }} />
      <p><strong>Note:</strong> {request.note}</p>
      <p><strong>Created Date:</strong> {new Date(request.createdDate).toLocaleDateString("en-GB")}</p>
      <p><strong>Updated Date:</strong> {new Date(request.updatedDate).toLocaleDateString("en-GB")}</p>
      <p><strong>Diamond ID:</strong> {request.diamondId}</p>
      <p><strong>User ID:</strong> {request.userId}</p>
      <p><strong>Process ID:</strong> {request.processId}</p>
    </div>
  );
}

export default RequestDetail;
