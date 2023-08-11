var status_obj = {
    "Pending": '#a55eea',
    'Draft' : '#79443B',
    'Scheduled' : '#FF8403',
    'In Progress' : '#9CCD38',
    'Sent to PMO': '#567BAF',
    'Sent to TL': '#EC505B', // Inflow 1st time forward to TL
    'Sent Back to TL': '#FF00FF', // Sent to TL from CM after Agree/Disagreement of CM
    'Sent to CM': '#00C3FC',
    'Sent to QC': '#00C3FC',
    'Sent to CAT': '#F2D600',
    'Forwarded to TL':'Black', // Sent to TL from CAT
    'Forwarded to CM':'Black',
    'Closed': '#C4C4C4',
    'Report Published': '#C4C4C4',
}

export default status_obj