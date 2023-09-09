import { Skeleton, Container } from "@mantine/core";
import "./style.css";
const SkletonTable = () => {
  return (
    <div className="skleton__table">
      <h2>Statistic</h2>
      <div className="skleton__table-wrp">
        <Skeleton height={55} circle />
        <Skeleton height={10} width={"280px"} ml={18} radius="lg" />
        <Skeleton height={10} width={"90px"} ml={"275px"} radius="lg" />
        <Skeleton height={10} width={"90px"} ml={"180px"} radius="lg" />
        <Skeleton height={10} width={"90px"} ml={"140px"} radius="lg" />
      </div>
      <hr />
      <div className="skleton__table-wrp">
        <Skeleton height={55} circle />
        <Skeleton height={10} width={"280px"} ml={18} radius="lg" />
        <Skeleton height={10} width={"90px"} ml={"275px"} radius="lg" />
        <Skeleton height={10} width={"90px"} ml={"180px"} radius="lg" />
        <Skeleton height={10} width={"90px"} ml={"140px"} radius="lg" />
      </div>
      <hr />
      <div className="skleton__table-wrp">
        <Skeleton height={55} circle />
        <Skeleton height={10} width={"280px"} ml={18} radius="lg" />
        <Skeleton height={10} width={"90px"} ml={"275px"} radius="lg" />
        <Skeleton height={10} width={"90px"} ml={"180px"} radius="lg" />
        <Skeleton height={10} width={"90px"} ml={"140px"} radius="lg" />
      </div>
      <hr />
      <div className="skleton__table-wrp">
        <Skeleton height={55} circle />
        <Skeleton height={10} width={"280px"} ml={18} radius="lg" />
        <Skeleton height={10} width={"90px"} ml={"275px"} radius="lg" />
        <Skeleton height={10} width={"90px"} ml={"180px"} radius="lg" />
        <Skeleton height={10} width={"90px"} ml={"140px"} radius="lg" />
      </div>
    </div>
  );
};

export default SkletonTable;
