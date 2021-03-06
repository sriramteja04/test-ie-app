import React from 'react'

import {
    AccessTime,
    Add,
    ArrowBackIos,
    ArrowDropDown,
    ArrowDropUp,
    ArrowForwardIos,
    Cancel,
    Check,
    CheckCircle,
    CheckCircleOutline,
    Close,
    CloudUploadOutlined,
    Edit,
    ErrorOutlineOutlined,
    ExpandLess,
    ExpandMore,
    FiberManualRecord,
    HighlightOff,
    InfoOutlined,
    ListAlt,
    Menu,
    MoreHoriz,
    MoreVert,
    PanoramaOutlined,
    ReportProblem,
    ReportProblemOutlined,
    Schedule,
    Search,
    Tune,
    Dashboard,
} from '@material-ui/icons'
import QATestingIcon from '../assets/icons/qatesting.svg'
import LiveStatus from '../assets/icons/LiveStatus.svg'
import Prioritize from '../assets/icons/Prioritize.svg'

export const Icons = () => ({
    AccessTimeIcon: () => <AccessTime />,
    AddIcon: () => <Add />,
    ArrowBackIosIcon: () => <ArrowBackIos />,
    ArrowDropDownIcon: () => <ArrowDropDown />,
    ArrowDropUpIcon: () => <ArrowDropUp />,
    ArrowForwardIosIcon: () => <ArrowForwardIos />,
    CancelIcon: () => <Cancel />,
    CheckCircleIcon: () => <CheckCircle />,
    CheckCircleOutlineIcon: () => <CheckCircleOutline />,
    CheckIcon: () => <Check />,
    CloseIcon: () => <Close />,
    CloudUploadOutlinedIcon: () => <CloudUploadOutlined />,
    DashboardIcon: () => <Dashboard />,
    EditIcon: () => <Edit />,
    ErrorOutlineOutlinedIcon: color => <ErrorOutlineOutlined color={color} />,
    ExpandLessIcon: () => <ExpandLess />,
    ExpandMoreIcon: () => <ExpandMore />,
    FiberManualRecordIcon: color => <FiberManualRecord color={color} />,
    HighlightOffIcon: () => <HighlightOff />,
    InfoOutlinedIcon: () => <InfoOutlined />,
    ListAltIcon: () => <ListAlt />,
    MenuIcon: () => <Menu />,
    MoreHorizIcon: () => <MoreHoriz />,
    MoreVertIcon: () => <MoreVert />,
    PanoramaOutlinedIcon: () => <PanoramaOutlined />,
    PrioritizeIcon: props => <img alt={'Prioritization'} src={Prioritize} {...props} />,
    ReportProblemIcon: () => <ReportProblem />,
    ReportProblemOutlinedIcon: color => <ReportProblemOutlined color={color} />,
    ScheduleIcon: () => <Schedule />,
    SearchIcon: () => <Search />,
    TuneIcon: () => <Tune />,
    LiveStatusIcon: props => <img alt={'LiveStatusIcon'} src={LiveStatus} {...props} />,
    QATestIcon: props => <img alt={'QATestIcon'} src={QATestingIcon} {...props} />,
})
