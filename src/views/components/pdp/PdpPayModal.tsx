import IMAGES from "constant/images/IMAGES"
import getTextConstant from "helpers/general/getTextConstant"
import Button from "views/components/button/Button"
import Image from "views/components/image/Image"
import Input from "views/components/input/Input"
import Modal from "views/components/modal/Modal"

function PdpPayModal({close}: { close: () => void }) {
    const {textConstant} = getTextConstant()

    function onChange() {

    }

    function onSubmit() {

    }

    return (
        <Modal className="pdp-pay-modal" close={close}>
            <div className="pdp-pay-modal-content">
                <Image className="pdp-pay-modal-content-img" src={IMAGES.general.heart} alt="" resize={{size: null}}/>
                <div className="pdp-pay-modal-content-title">{textConstant.involve}</div>
                <div className="pdp-pay-modal-content-desc">{textConstant.inputPrice}</div>
                <div className="pdp-pay-modal-content-input">
                    <Input onChange={onChange}
                           maxLength={10}
                           minLength={4}
                           type="tel"
                           placeholder={textConstant.inputPriceHolder}
                           focusOnMount
                           onSubmit={onSubmit}
                    />
                    <div className="pdp-pay-modal-content-input-label">{textConstant.toman}</div>
                </div>
                <Button desktopIsFullWidth>
                    {textConstant.pay}
                </Button>
            </div>
        </Modal>
    )
}

export default PdpPayModal
