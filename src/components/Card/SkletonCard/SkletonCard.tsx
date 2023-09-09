import "./style.css";
import { Skeleton, Container } from "@mantine/core";
const SkletonCard = () => {
  return (
    <div className="skletoncard">
      <div className="skletoncard__wrp">
        <div>
          <Skeleton height={200} circle mb="xl"/>
          <Skeleton height={18} width={"100px"} />
          <Skeleton height={18} mt="xs" width={"145px"} />
          <Skeleton
            height={48}
            circle
            width={"125px"}
            mt={"-50px"}
            style={{ position: "absolute", right: "10px" }}
          />
          <div style={{display:'flex', marginTop:'10px',gap:'8px'}}>
            <Skeleton height={30} width={"30px"} />
            <Skeleton height={30} width={"30px"} />
            <Skeleton height={30} width={"30px"} />
            <Skeleton height={30} width={"30px"} />
          </div>
          <Skeleton height={18} mt="xl" width={"100px"} />
          <Skeleton height={28} mt="xl" width={"200px"} />
          <Skeleton height={18} mt="md" width={"200px"} />
          <Skeleton height={18} mt="md" width={"200px"} />
        </div>
      </div>
      <div className="skletoncard__wrp">
        <div>
          <Skeleton height={200} circle mb="xl"/>
          <Skeleton height={18} width={"100px"} />
          <Skeleton height={18} mt="xs" width={"145px"} />
          <Skeleton
            height={48}
            circle
            width={"125px"}
            mt={"-50px"}
            style={{ position: "absolute", right: "10px" }}
          />
          <div style={{display:'flex', marginTop:'10px',gap:'8px'}}>
            <Skeleton height={30} width={"30px"} />
            <Skeleton height={30} width={"30px"} />
            <Skeleton height={30} width={"30px"} />
            <Skeleton height={30} width={"30px"} />
          </div>
          <Skeleton height={18} mt="xl" width={"100px"} />
          <Skeleton height={28} mt="xl" width={"200px"} />
          <Skeleton height={18} mt="md" width={"200px"} />
          <Skeleton height={18} mt="md" width={"200px"} />
        </div>
      </div>
      <div className="skletoncard__wrp">
        <div>
          <Skeleton height={200} circle mb="xl"/>
          <Skeleton height={18} width={"100px"} />
          <Skeleton height={18} mt="xs" width={"145px"} />
          <Skeleton
            height={48}
            circle
            width={"125px"}
            mt={"-50px"}
            style={{ position: "absolute", right: "10px" }}
          />
          <div style={{display:'flex', marginTop:'10px',gap:'8px'}}>
            <Skeleton height={30} width={"30px"} />
            <Skeleton height={30} width={"30px"} />
            <Skeleton height={30} width={"30px"} />
            <Skeleton height={30} width={"30px"} />
          </div>
          <Skeleton height={18} mt="xl" width={"100px"} />
          <Skeleton height={28} mt="xl" width={"200px"} />
          <Skeleton height={18} mt="md" width={"200px"} />
          <Skeleton height={18} mt="md" width={"200px"} />
        </div>
      </div>
      <div className="skletoncard__wrp">
        <div>
          <Skeleton height={200} circle mb="xl"/>
          <Skeleton height={18} width={"100px"} />
          <Skeleton height={18} mt="xs" width={"145px"} />
          <Skeleton
            height={48}
            circle
            width={"125px"}
            mt={"-50px"}
            style={{ position: "absolute", right: "10px" }}
          />
          <div style={{display:'flex', marginTop:'10px',gap:'8px'}}>
            <Skeleton height={30} width={"30px"} />
            <Skeleton height={30} width={"30px"} />
            <Skeleton height={30} width={"30px"} />
            <Skeleton height={30} width={"30px"} />
          </div>
          <Skeleton height={18} mt="xl" width={"100px"} />
          <Skeleton height={28} mt="xl" width={"200px"} />
          <Skeleton height={18} mt="md" width={"200px"} />
          <Skeleton height={18} mt="md" width={"200px"} />
        </div>
      </div>
    </div>
  );
};

export default SkletonCard;
