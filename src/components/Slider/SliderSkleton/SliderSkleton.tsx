import "./style.css";
import { Skeleton,Container } from "@mantine/core";
const SliderSkleton = () => {
  return (
    <div className="slider__wrapper">
      <Container size="xl">
        <div className="bg__lines">
          <span className="line-1"></span>
          <span className="line-2"></span>
          <span className="line-3"></span>
          <span className="line-4"></span>
        </div>
        <div className="sliderskleton">
          <div className="sliderskleton__wrp">
            <Skeleton
              height={40}
              mt={14}
              width={"1000px"}
              mr="-20px"
              radius="xs"
            />
            <Skeleton height={62} circle />
          </div>
          <div className="sliderskleton__wrp">
            <Skeleton
              height={40}
              mt={14}
              width={"700px"}
              mr="-20px"
              radius="xs"
            />
            <Skeleton height={62} circle />
          </div>
          <div className="sliderskleton__wrp">
            <Skeleton
              height={40}
              mt={14}
              width={"500px"}
              mr="-20px"
              radius="xs"
            />
            <Skeleton height={62} circle />
          </div>
          <div className="sliderskleton__wrp">
            <Skeleton
              height={40}
              mt={14}
              width={"300px"}
              mr="-20px"
              radius="xs"
            />
            <Skeleton height={62} circle />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SliderSkleton;
