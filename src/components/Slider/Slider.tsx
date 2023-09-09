import { FC } from "react";
import { Slider } from "@mantine/core";
import "./styless.css";
import Skletavatar from "assets/images/skletavatar.svg";
type ModalProps = {
  item?: any;
};

const CustomSlider: FC<ModalProps> = ({ item }) => {

  return (
    <>
      <div
        className={`${
          item.real_numbers == 0 ? "slider__default" : "slider__fullname"
        }  `}
      >
        <div className="slider__info">
          <div className="slider__info-name">
            <p> {item.first_name}</p>
            <p> {item.last_name}</p>
          </div>
          <div className="slider__voter-info">
            <p>Votes</p>
            <p>{item.real_numbers} </p>
          </div>
          <span className="voter__slide-line">|</span>
        </div>
      </div>
      <Slider
        thumbChildren={
          <img
            src={item.image ? item.image : Skletavatar}
            className="slider__img"
          />
        }
        label={null}
        defaultValue={item.real_numbers}
        thumbSize={47}
        styles={{
          thumb: { borderWidth: 0, padding: 0, left: -95, zIndex: 2 },
        }}
      />
    </>
  );
};

export default CustomSlider;
