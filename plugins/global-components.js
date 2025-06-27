import Vue from "vue";
import HeaderSection from "~/components/section/HeaderSection";
import ReportSection from "~/components/section/ReportSection";
import FilterSection from "~/components/section/FilterSection";
import TableHeaderSection from "~/components/section/TableHeaderSection";
import TableDataLoadingSection from "~/components/section/TableDataLoadingSection";
import TableDataNotFoundSection from "~/components/section/TableDataNotFoundSection";
import ListOptionSection from "~/components/section/ListOptionSection";
import PaginationSection from "~/components/section/PaginationSection";
import ModalHeaderSection from "~/components/section/ModalHeaderSection";
import ModalFooterSection from "~/components/section/ModalFooterSection";
import ModalFooterSectionWoReset from "~/components/section/ModalFooterSectionWoReset";

import VuePerfectScrollbar from "vue-perfect-scrollbar";
import HeightCollapsible from "vue-height-collapsible";

import SmallEditButton from "../components/button/SmallEditButton.vue";
import SmallDeleteButton from "../components/button/SmallDeleteButton.vue";
import SmallDetailButton from "../components/button/SmallDetailButton.vue";
import SmallRestoreButton from "../components/button/SmallRestoreButton.vue";

import SaveButton from "../components/forms/SaveButton.vue";
import ResetButton from "../components/forms/ResetButton.vue";
import CloseButton from "../components/forms/CloseButton.vue";
import TitleForm from "../components/forms/TitleForm.vue";
import InputForm from "../components/InputForm/InputForm.vue";


const icons = {
    //   ThemeCustomizer: require("~/components/ThemeCustomizer.vue").default,
    IconAirplay: require("~/components/icon/icon-airplay.vue").default,
    IconArchive: require("~/components/icon/icon-archive.vue").default,
    IconArrowBackward: require("~/components/icon/icon-arrow-backward.vue")
        .default,
    IconArrowForward: require("~/components/icon/icon-arrow-forward.vue").default,
    IconArrowLeft: require("~/components/icon/icon-arrow-left.vue").default,
    IconArrowWaveLeftUp: require("~/components/icon/icon-arrow-wave-left-up.vue")
        .default,
    IconAt: require("~/components/icon/icon-at.vue").default,
    //   IconBanknote: require("~/components/icon/icon-banknote.vue").default,
    IconBell: require("~/components/icon/icon-bell.vue").default,
    IconBellBing: require("~/components/icon/icon-bell-bing.vue").default,
    //   IconBold: require("~/components/icon/icon-bold.vue").default,
    IconBookmark: require("~/components/icon/icon-bookmark.vue").default,
    IconBox: require("~/components/icon/icon-box.vue").default,
    //   IconBriefcase: require("~/components/icon/icon-briefcase.vue").default,
    IconCalendar: require("~/components/icon/icon-calendar.vue").default,
    IconCamera: require("~/components/icon/icon-camera.vue").default,
    IconCaretsDown: require("~/components/icon/icon-carets-down.vue").default,
    //   IconChat: require("~/components/icon/icon-chat.vue").default,
    //   IconCheck: require("~/components/icon/icon-check.vue").default,
    //   IconChevronDown: require("~/components/icon/icon-chevron-down.vue").default,
    //   IconClipboard: require("~/components/icon/icon-clipboard.vue").default,
    IconClock: require("~/components/icon/icon-clock.vue").default,
    IconCloudDownload: require("~/components/icon/icon-cloud-download.vue")
        .default,
    IconCopy: require("~/components/icon/icon-copy.vue").default,
    //   IconCornerDownLeft: require("~/components/icon/icon-corner-down-left.vue")
    // .default,
    //   IconCpu: require("~/components/icon/icon-cpu.vue").default,
    IconCreditCard: require("~/components/icon/icon-credit-card.vue").default,
    IconDownload: require("~/components/icon/icon-download.vue").default,
    IconEdit: require("~/components/icon/icon-edit.vue").default,
    IconEye: require("~/components/icon/icon-eye.vue").default,
    IconFile: require("~/components/icon/icon-file.vue").default,
    //   IconFilter: require("~/components/icon/icon-filter.vue").default,
    //   IconFlag: require("~/components/icon/icon-flag.vue").default,
    IconFolder: require("~/components/icon/icon-folder.vue").default,
    //   IconGridDots: require("~/components/icon/icon-grid-dots.vue").default,
    IconHeart: require("~/components/icon/icon-heart.vue").default,
    //   IconHelp: require("~/components/icon/icon-help.vue").default,
    IconHome: require("~/components/icon/icon-home.vue").default,
    //   IconImage: require("~/components/icon/icon-image.vue").default,
    IconInfoCircle: require("~/components/icon/icon-info-circle.vue").default,
    //   IconItalic: require("~/components/icon/icon-italic.vue").default,
    //   IconLayers: require("~/components/icon/icon-layers.vue").default,
    IconLayout: require("~/components/icon/icon-layout.vue").default,
    IconLink: require("~/components/icon/icon-link.vue").default,
    IconLoader: require("~/components/icon/icon-loader.vue").default,
    IconLock: require("~/components/icon/icon-lock.vue").default,
    IconLogout: require("~/components/icon/icon-logout.vue").default,
    IconMail: require("~/components/icon/icon-mail.vue").default,
    IconMenu: require("~/components/icon/icon-menu.vue").default,
    IconMessage: require("~/components/icon/icon-message.vue").default,
    IconMinus: require("~/components/icon/icon-minus.vue").default,
    IconMoon: require("~/components/icon/icon-moon.vue").default,
    //   IconMoreHorizontal: require("~/components/icon/icon-more-horizontal.vue")
    //     .default,
    //   IconNotification: require("~/components/icon/icon-notification.vue").default,
    IconPaperclip: require("~/components/icon/icon-paperclip.vue").default,
    IconPencil: require("~/components/icon/icon-pencil.vue").default,
    IconPhone: require("~/components/icon/icon-phone.vue").default,
    IconPlus: require("~/components/icon/icon-plus.vue").default,
    IconPrinter: require("~/components/icon/icon-printer.vue").default,
    IconSave: require("~/components/icon/icon-save.vue").default,
    IconSearch: require("~/components/icon/icon-search.vue").default,
    IconSend: require("~/components/icon/icon-send.vue").default,
    IconSettings: require("~/components/icon/icon-settings.vue").default,
    IconShare: require("~/components/icon/icon-share.vue").default,
    //   IconShieldCheck: require("~/components/icon/icon-shield-check.vue").default,
    IconStar: require("~/components/icon/icon-star.vue").default,
    IconSun: require("~/components/icon/icon-sun.vue").default,
    IconTag: require("~/components/icon/icon-tag.vue").default,
    IconThumbUp: require("~/components/icon/icon-thumb-up.vue").default,
    IconTrash: require("~/components/icon/icon-trash.vue").default,
    IconTrendingUp: require("~/components/icon/icon-trending-up.vue").default,
    //   IconTruck: require("~/components/icon/icon-truck.vue").default,
    //   IconUpload: require("~/components/icon/icon-upload.vue").default,
    IconUser: require("~/components/icon/icon-user.vue").default,
    IconUsers: require("~/components/icon/icon-users.vue").default,
    IconX: require("~/components/icon/icon-x.vue").default,
};
Object.entries(icons).forEach(([name, component]) => {
    Vue.component(name, component);
});

Vue.component("header-section", HeaderSection);
Vue.component("report-section", ReportSection);
Vue.component("filter-section", FilterSection);
Vue.component("table-header-section", TableHeaderSection);
Vue.component("table-data-loading-section", TableDataLoadingSection);
Vue.component("table-data-not-found-section", TableDataNotFoundSection);
Vue.component("list-option-section", ListOptionSection);
Vue.component("pagination-section", PaginationSection);
Vue.component("modal-header-section", ModalHeaderSection);
Vue.component("modal-footer-section", ModalFooterSection);
Vue.component("modal-footer-section-wo-reset", ModalFooterSectionWoReset);
Vue.component("vue-perfect-scrollbar", VuePerfectScrollbar);
Vue.component("vue-collapsible", HeightCollapsible);

Vue.component("small-edit-button", SmallEditButton);
Vue.component("small-delete-button", SmallDeleteButton);
Vue.component("small-detail-button", SmallDetailButton);
Vue.component("small-restore-button", SmallRestoreButton);

Vue.component("save-button", SaveButton);
Vue.component("reset-button", ResetButton);
Vue.component("close-button", CloseButton);
Vue.component("title-form", TitleForm);
Vue.component("input-form", InputForm);
