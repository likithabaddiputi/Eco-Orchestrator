
import { AppData, ComputeRecord, CarbonAggregate, ElectricityRecord, EmissionFactor, FoodRecord, CampusStats, Suggestion, PredictionResult } from '../types';

// Raw CSV Data Constants - Full 100-row datasets
const RAW_COMPUTE_CSV = `id,job_id,start_timestamp,end_timestamp,duration_seconds,energy_kwh,hardware_type,location_region,grid_intensity,functional_unit,embodied_emissions_kg,notes,created_at,updated_at
1,CAMPUS-JOB-001,05/01/2026 09:25,2026-01-05 12:47:10,12130,59.06,CPU Server,Computer Center,0.837,model-training,1.85,On-campus compute workload,2026-01-05 09:25:00,2026-01-05 09:25:00
2,CAMPUS-JOB-002,2026-01-05 09:50:00,2026-01-05 10:20:10,1810,56.79,HPC Node,Campus Data Center,0.819,data-processing,1.49,On-campus compute workload,2026-01-05 09:50:00,2026-01-05 09:50:00
3,CAMPUS-JOB-003,2026-01-05 10:15:00,2026-01-05 11:21:55,4015,59.36,CPU Server,Campus Data Center,0.765,simulation,2.17,On-campus compute workload,2026-01-05 10:15:00,2026-01-05 10:15:00
4,CAMPUS-JOB-004,2026-01-05 10:40:00,2026-01-05 11:42:11,3731,41.64,GPU Server,Computer Center,0.677,student-projects,0.77,On-campus compute workload,2026-01-05 10:40:00,2026-01-05 10:40:00
5,CAMPUS-JOB-005,2026-01-05 11:05:00,2026-01-05 12:22:20,4640,55.37,HPC Node,AI Lab,0.883,simulation,1.88,On-campus compute workload,2026-01-05 11:05:00,2026-01-05 11:05:00
6,CAMPUS-JOB-006,2026-01-05 11:30:00,2026-01-05 12:55:15,5115,82.35,CPU Server,AI Lab,0.858,simulation,2.26,On-campus compute workload,2026-01-05 11:30:00,2026-01-05 11:30:00
7,CAMPUS-JOB-007,2026-01-05 11:55:00,2026-01-05 15:45:18,13818,43.96,CPU Server,AI Lab,0.754,simulation,1.48,On-campus compute workload,2026-01-05 11:55:00,2026-01-05 11:55:00
8,CAMPUS-JOB-008,2026-01-05 12:20:00,2026-01-05 15:44:29,12269,55.93,CPU Server,Campus Data Center,0.731,model-training,1.77,On-campus compute workload,2026-01-05 12:20:00,2026-01-05 12:20:00
9,CAMPUS-JOB-009,2026-01-05 12:45:00,2026-01-05 17:01:46,15406,33.66,HPC Node,Research Lab,0.879,model-training,0.79,On-campus compute workload,2026-01-05 12:45:00,2026-01-05 12:45:00
10,CAMPUS-JOB-010,2026-01-05 13:10:00,2026-01-05 16:54:14,13454,82.78,CPU Server,Computer Center,0.792,simulation,1.9,On-campus compute workload,2026-01-05 13:10:00,2026-01-05 13:10:00
11,CAMPUS-JOB-011,2026-01-05 13:35:00,2026-01-05 14:34:42,3582,24.59,GPU Server,Research Lab,0.747,student-projects,0.51,On-campus compute workload,2026-01-05 13:35:00,2026-01-05 13:35:00
12,CAMPUS-JOB-012,2026-01-05 14:00:00,2026-01-05 14:30:32,1832,44.42,GPU Server,Research Lab,0.847,data-processing,1.06,On-campus compute workload,2026-01-05 14:00:00,2026-01-05 14:00:00
13,CAMPUS-JOB-013,2026-01-05 14:25:00,2026-01-05 17:17:54,10374,9.58,CPU Server,Research Lab,0.762,data-processing,0.22,On-campus compute workload,2026-01-05 14:25:00,2026-01-05 14:25:00
14,CAMPUS-JOB-014,2026-01-05 14:50:00,2026-01-05 18:32:38,13358,20.24,CPU Server,Computer Center,0.78,data-processing,0.31,On-campus compute workload,2026-01-05 14:50:00,2026-01-05 14:50:00
15,CAMPUS-JOB-015,2026-01-05 15:15:00,2026-01-05 18:10:11,10511,40.94,CPU Server,Campus Data Center,0.645,data-processing,1.01,On-campus compute workload,2026-01-05 15:15:00,2026-01-05 15:15:00
16,CAMPUS-JOB-016,2026-01-05 15:40:00,2026-01-05 17:43:39,7419,30.23,HPC Node,AI Lab,0.683,simulation,0.53,On-campus compute workload,2026-01-05 15:40:00,2026-01-05 15:40:00
17,CAMPUS-JOB-017,2026-01-05 16:05:00,2026-01-05 19:26:44,12104,15.9,CPU Server,Computer Center,0.727,student-projects,0.34,On-campus compute workload,2026-01-05 16:05:00,2026-01-05 16:05:00
18,CAMPUS-JOB-018,2026-01-05 16:30:00,2026-01-05 19:10:42,9642,22.32,GPU Server,AI Lab,0.628,data-processing,0.55,On-campus compute workload,2026-01-05 16:30:00,2026-01-05 16:30:00
19,CAMPUS-JOB-019,2026-01-05 16:55:00,2026-01-05 19:18:11,8591,23.05,GPU Server,Campus Data Center,0.846,model-training,0.39,On-campus compute workload,2026-01-05 16:55:00,2026-01-05 16:55:00
20,CAMPUS-JOB-020,2026-01-05 17:20:00,2026-01-05 22:12:17,17537,35.31,CPU Server,AI Lab,0.722,model-training,1.34,On-campus compute workload,2026-01-05 17:20:00,2026-01-05 17:20:00
21,CAMPUS-JOB-021,2026-01-05 17:45:00,2026-01-05 22:33:41,17321,14.72,HPC Node,Campus Data Center,0.672,model-training,0.49,On-campus compute workload,2026-01-05 17:45:00,2026-01-05 17:45:00
22,CAMPUS-JOB-022,2026-01-05 18:10:00,2026-01-05 19:12:58,3778,37.08,CPU Server,Campus Data Center,0.663,simulation,1.37,On-campus compute workload,2026-01-05 18:10:00,2026-01-05 18:10:00
23,CAMPUS-JOB-023,2026-01-05 18:35:00,2026-01-05 19:37:39,3759,80.2,GPU Server,Campus Data Center,0.654,student-projects,3.08,On-campus compute workload,2026-01-05 18:35:00,2026-01-05 18:35:00
24,CAMPUS-JOB-024,2026-01-05 19:00:00,2026-01-05 20:28:35,5315,15.04,GPU Server,Research Lab,0.89,simulation,0.59,On-campus compute workload,2026-01-05 19:00:00,2026-01-05 19:00:00
25,CAMPUS-JOB-025,2026-01-05 19:25:00,2026-01-05 23:50:42,15942,16.03,GPU Server,Campus Data Center,0.636,model-training,0.25,On-campus compute workload,2026-01-05 19:25:00,2026-01-05 19:25:00
26,CAMPUS-JOB-026,2026-01-05 19:50:00,2026-01-05 20:46:09,3369,46.37,GPU Server,Computer Center,0.617,model-training,1.17,On-campus compute workload,2026-01-05 19:50:00,2026-01-05 19:50:00
27,CAMPUS-JOB-027,2026-01-05 20:15:00,2026-01-06 00:24:49,14989,53.48,CPU Server,Campus Data Center,0.868,model-training,2.09,On-campus compute workload,2026-01-05 20:15:00,2026-01-05 20:15:00
28,CAMPUS-JOB-028,2026-01-05 20:40:00,2026-01-06 01:06:40,16000,43.87,GPU Server,Campus Data Center,0.805,simulation,0.93,On-campus compute workload,2026-01-05 20:40:00,2026-01-05 20:40:00
29,CAMPUS-JOB-029,2026-01-05 21:05:00,2026-01-06 01:48:06,16986,76.73,CPU Server,Computer Center,0.621,model-training,1.95,On-campus compute workload,2026-01-05 21:05:00,2026-01-05 21:05:00
30,CAMPUS-JOB-030,2026-01-05 21:30:00,2026-01-06 02:20:38,17438,10.74,HPC Node,AI Lab,0.894,student-projects,0.31,On-campus compute workload,2026-01-05 21:30:00,2026-01-05 21:30:00
31,CAMPUS-JOB-031,2026-01-05 21:55:00,2026-01-05 23:05:29,4229,34.31,CPU Server,Campus Data Center,0.627,model-training,1.06,On-campus compute workload,2026-01-05 21:55:00,2026-01-05 21:55:00
32,CAMPUS-JOB-032,2026-01-05 22:20:00,2026-01-06 00:09:16,6556,16.56,HPC Node,Computer Center,0.792,student-projects,0.61,On-campus compute workload,2026-01-05 22:20:00,2026-01-05 22:20:00
33,CAMPUS-JOB-033,2026-01-05 22:45:00,2026-01-06 02:03:11,11891,65.14,CPU Server,Campus Data Center,0.891,data-processing,2.53,On-campus compute workload,2026-01-05 22:45:00,2026-01-05 22:45:00
34,CAMPUS-JOB-034,2026-01-05 23:10:00,2026-01-06 00:41:50,5510,59.86,HPC Node,Campus Data Center,0.788,data-processing,1.07,On-campus compute workload,2026-01-05 23:10:00,2026-01-05 23:10:00
35,CAMPUS-JOB-035,2026-01-05 23:35:00,2026-01-06 01:50:52,8152,34.79,GPU Server,Computer Center,0.795,model-training,0.6,On-campus compute workload,2026-01-05 23:35:00,2026-01-05 23:35:00
36,CAMPUS-JOB-036,2026-01-06 00:00:00,2026-01-06 03:11:42,11502,19.65,HPC Node,Research Lab,0.7,data-processing,0.47,On-campus compute workload,2026-01-06 00:00:00,2026-01-06 00:00:00
37,CAMPUS-JOB-037,2026-01-06 00:25:00,2026-01-06 04:24:55,14395,83.22,HPC Node,Campus Data Center,0.679,simulation,2.34,On-campus compute workload,2026-01-06 00:25:00,2026-01-06 00:25:00
38,CAMPUS-JOB-038,2026-01-06 00:50:00,2026-01-06 01:38:17,2897,41.98,CPU Server,Research Lab,0.604,model-training,1.53,On-campus compute workload,2026-01-06 00:50:00,2026-01-06 00:50:00
39,CAMPUS-JOB-039,2026-01-06 01:15:00,2026-01-06 03:11:46,7006,50.65,HPC Node,Research Lab,0.795,student-projects,1.66,On-campus compute workload,2026-01-06 01:15:00,2026-01-06 01:15:00
40,CAMPUS-JOB-040,2026-01-06 01:40:00,2026-01-06 02:14:49,2089,49.15,GPU Server,AI Lab,0.849,model-training,1.32,On-campus compute workload,2026-01-06 01:40:00,2026-01-06 01:40:00
41,CAMPUS-JOB-041,2026-01-06 02:05:00,2026-01-06 03:23:33,4713,51.7,GPU Server,Campus Data Center,0.75,model-training,1.19,On-campus compute workload,2026-01-06 02:05:00,2026-01-06 02:05:00
42,CAMPUS-JOB-042,2026-01-06 02:30:00,2026-01-06 06:02:58,12778,69.94,HPC Node,Computer Center,0.686,student-projects,1.27,On-campus compute workload,2026-01-06 02:30:00,2026-01-06 02:30:00
43,CAMPUS-JOB-043,2026-01-06 02:55:00,2026-01-06 05:37:57,9777,42.82,HPC Node,AI Lab,0.708,student-projects,0.86,On-campus compute workload,2026-01-06 02:55:00,2026-01-06 02:55:00
44,CAMPUS-JOB-044,2026-01-06 03:20:00,2026-01-06 07:08:29,13709,55.17,CPU Server,Campus Data Center,0.72,model-training,1.28,On-campus compute workload,2026-01-06 03:20:00,2026-01-06 03:20:00
45,CAMPUS-JOB-045,2026-01-06 03:45:00,2026-01-06 07:12:37,12457,12.98,GPU Server,Research Lab,0.808,data-processing,0.28,On-campus compute workload,2026-01-06 03:45:00,2026-01-06 03:45:00
46,CAMPUS-JOB-046,2026-01-06 04:10:00,2026-01-06 05:40:26,5426,34.08,GPU Server,AI Lab,0.625,data-processing,0.66,On-campus compute workload,2026-01-06 04:10:00,2026-01-06 04:10:00
47,CAMPUS-JOB-047,2026-01-06 04:35:00,2026-01-06 06:37:33,7353,75.28,CPU Server,Computer Center,0.778,simulation,2.23,On-campus compute workload,2026-01-06 04:35:00,2026-01-06 04:35:00
48,CAMPUS-JOB-048,2026-01-06 05:00:00,2026-01-06 09:44:25,17065,56.93,GPU Server,Campus Data Center,0.791,student-projects,0.96,On-campus compute workload,2026-01-06 05:00:00,2026-01-06 05:00:00
49,CAMPUS-JOB-049,2026-01-06 05:25:00,2026-01-06 07:27:06,7326,61.32,CPU Server,Campus Data Center,0.89,data-processing,1.46,On-campus compute workload,2026-01-06 05:25:00,2026-01-06 05:25:00
50,CAMPUS-JOB-050,2026-01-06 05:50:00,2026-01-06 09:40:42,13842,13.08,HPC Node,AI Lab,0.815,model-training,0.23,On-campus compute workload,2026-01-06 05:50:00,2026-01-06 05:50:00
51,CAMPUS-JOB-051,2026-01-06 06:15:00,2026-01-06 10:50:30,16530,30.75,CPU Server,Research Lab,0.697,student-projects,0.65,On-campus compute workload,2026-01-06 06:15:00,2026-01-06 06:15:00
52,CAMPUS-JOB-052,2026-01-06 06:40:00,2026-01-06 10:26:24,13584,37.07,HPC Node,Computer Center,0.715,simulation,0.73,On-campus compute workload,2026-01-06 06:40:00,2026-01-06 06:40:00
53,CAMPUS-JOB-053,2026-01-06 07:05:00,2026-01-06 08:47:10,6130,83.1,CPU Server,Research Lab,0.876,model-training,2.4,On-campus compute workload,2026-01-06 07:05:00,2026-01-06 07:05:00
54,CAMPUS-JOB-054,2026-01-06 07:30:00,2026-01-06 11:52:13,15733,8.36,GPU Server,AI Lab,0.872,simulation,0.28,On-campus compute workload,2026-01-06 07:30:00,2026-01-06 07:30:00
55,CAMPUS-JOB-055,2026-01-06 07:55:00,2026-01-06 10:53:59,10739,79.53,HPC Node,Computer Center,0.689,data-processing,1.55,On-campus compute workload,2026-01-06 07:55:00,2026-01-06 07:55:00
56,CAMPUS-JOB-056,2026-01-06 08:20:00,2026-01-06 11:09:07,10147,19.79,CPU Server,Campus Data Center,0.832,student-projects,0.36,On-campus compute workload,2026-01-06 08:20:00,2026-01-06 08:20:00
57,CAMPUS-JOB-057,2026-01-06 08:45:00,2026-01-06 09:47:51,3771,33.77,GPU Server,Campus Data Center,0.606,data-processing,0.57,On-campus compute workload,2026-01-06 08:45:00,2026-01-06 08:45:00
58,CAMPUS-JOB-058,2026-01-06 09:10:00,2026-01-06 12:34:11,12251,41.31,HPC Node,Computer Center,0.892,simulation,1.57,On-campus compute workload,2026-01-06 09:10:00,2026-01-06 09:10:00
59,CAMPUS-JOB-059,2026-01-06 09:35:00,2026-01-06 14:07:30,16350,45.42,HPC Node,Research Lab,0.705,student-projects,0.9,On-campus compute workload,2026-01-06 09:35:00,2026-01-06 09:35:00
60,CAMPUS-JOB-060,2026-01-06 10:00:00,2026-01-06 12:40:41,9641,54.49,GPU Server,AI Lab,0.769,student-projects,2.13,On-campus compute workload,2026-01-06 10:00:00,2026-01-06 10:00:00
61,CAMPUS-JOB-061,2026-01-06 10:25:00,2026-01-06 11:37:45,4365,15.03,HPC Node,Research Lab,0.856,data-processing,0.36,On-campus compute workload,2026-01-06 10:25:00,2026-01-06 10:25:00
62,CAMPUS-JOB-062,2026-01-06 10:50:00,2026-01-06 12:36:27,6387,76.19,GPU Server,Research Lab,0.864,model-training,1.15,On-campus compute workload,2026-01-06 10:50:00,2026-01-06 10:50:00
63,CAMPUS-JOB-063,2026-01-06 11:15:00,2026-01-06 16:00:48,17148,60.16,HPC Node,Computer Center,0.637,student-projects,1.95,On-campus compute workload,2026-01-06 11:15:00,2026-01-06 11:15:00
64,CAMPUS-JOB-064,2026-01-06 11:40:00,2026-01-06 15:24:06,13446,22.59,GPU Server,Campus Data Center,0.687,model-training,0.45,On-campus compute workload,2026-01-06 11:40:00,2026-01-06 11:40:00
65,CAMPUS-JOB-065,2026-01-06 12:05:00,2026-01-06 17:03:21,17901,66.61,GPU Server,AI Lab,0.674,data-processing,1.38,On-campus compute workload,2026-01-06 12:05:00,2026-01-06 12:05:00
66,CAMPUS-JOB-066,2026-01-06 12:30:00,2026-01-06 15:13:06,9786,27.63,CPU Server,Computer Center,0.691,simulation,0.52,On-campus compute workload,2026-01-06 12:30:00,2026-01-06 12:30:00
67,CAMPUS-JOB-067,2026-01-06 12:55:00,2026-01-06 17:35:07,16807,75.48,HPC Node,AI Lab,0.678,simulation,1.52,On-campus compute workload,2026-01-06 12:55:00,2026-01-06 12:55:00
68,CAMPUS-JOB-068,2026-01-06 13:20:00,2026-01-06 17:01:11,13271,36.21,HPC Node,AI Lab,0.866,simulation,0.72,On-campus compute workload,2026-01-06 13:20:00,2026-01-06 13:20:00
69,CAMPUS-JOB-069,2026-01-06 13:45:00,2026-01-06 18:31:03,17163,26.88,HPC Node,Research Lab,0.794,model-training,0.89,On-campus compute workload,2026-01-06 13:45:00,2026-01-06 13:45:00
70,CAMPUS-JOB-070,2026-01-06 14:10:00,2026-01-06 17:26:20,11780,42.81,HPC Node,Campus Data Center,0.855,simulation,1.21,On-campus compute workload,2026-01-06 14:10:00,2026-01-06 14:10:00
71,CAMPUS-JOB-071,2026-01-06 14:35:00,2026-01-06 16:11:44,5804,38.89,GPU Server,AI Lab,0.628,data-processing,1.45,On-campus compute workload,2026-01-06 14:35:00,2026-01-06 14:35:00
72,CAMPUS-JOB-072,2026-01-06 15:00:00,2026-01-06 17:58:00,10680,27.63,HPC Node,Campus Data Center,0.744,student-projects,1.01,On-campus compute workload,2026-01-06 15:00:00,2026-01-06 15:00:00
73,CAMPUS-JOB-073,2026-01-06 15:25:00,2026-01-06 19:58:11,16391,26.39,HPC Node,Campus Data Center,0.831,data-processing,0.49,On-campus compute workload,2026-01-06 15:25:00,2026-01-06 15:25:00
74,CAMPUS-JOB-074,2026-01-06 15:50:00,2026-01-06 16:56:43,4003,18.43,GPU Server,AI Lab,0.731,simulation,0.6,On-campus compute workload,2026-01-06 15:50:00,2026-01-06 15:50:00
75,CAMPUS-JOB-075,2026-01-06 16:15:00,2026-01-06 17:01:07,2767,10.67,HPC Node,Research Lab,0.678,student-projects,0.22,On-campus compute workload,2026-01-06 16:15:00,2026-01-06 16:15:00
76,CAMPUS-JOB-076,2026-01-06 16:40:00,2026-01-06 18:27:01,6421,80.12,GPU Server,Research Lab,0.867,simulation,2.5,On-campus compute workload,2026-01-06 16:40:00,2026-01-06 16:40:00
77,CAMPUS-JOB-077,2026-01-06 17:05:00,2026-01-06 17:54:22,2962,44.24,HPC Node,AI Lab,0.727,model-training,0.8,On-campus compute workload,2026-01-06 17:05:00,2026-01-06 17:05:00
78,CAMPUS-JOB-078,2026-01-06 17:30:00,2026-01-06 21:18:01,13681,61.12,GPU Server,Research Lab,0.856,student-projects,2.32,On-campus compute workload,2026-01-06 17:30:00,2026-01-06 17:30:00
79,CAMPUS-JOB-079,2026-01-06 17:55:00,2026-01-06 22:10:40,15340,55.89,HPC Node,Research Lab,0.833,student-projects,1.11,On-campus compute workload,2026-01-06 17:55:00,2026-01-06 17:55:00
80,CAMPUS-JOB-080,2026-01-06 18:20:00,2026-01-06 19:08:26,2906,27.74,CPU Server,Research Lab,0.653,model-training,1.05,On-campus compute workload,2026-01-06 18:20:00,2026-01-06 18:20:00
81,CAMPUS-JOB-081,2026-01-06 18:45:00,2026-01-06 21:43:45,10725,53.89,HPC Node,Campus Data Center,0.864,student-projects,1.79,On-campus compute workload,2026-01-06 18:45:00,2026-01-06 18:45:00
82,CAMPUS-JOB-082,2026-01-06 19:10:00,2026-01-06 23:37:21,16041,11.92,HPC Node,Computer Center,0.866,data-processing,0.23,On-campus compute workload,2026-01-06 19:10:00,2026-01-06 19:10:00
83,CAMPUS-JOB-083,2026-01-06 19:35:00,2026-01-06 21:56:02,8462,44.69,HPC Node,AI Lab,0.774,data-processing,0.87,On-campus compute workload,2026-01-06 19:35:00,2026-01-06 19:35:00
84,CAMPUS-JOB-084,2026-01-06 20:00:00,2026-01-06 22:19:44,8384,28.88,HPC Node,Computer Center,0.786,data-processing,0.68,On-campus compute workload,2026-01-06 20:00:00,2026-01-06 20:00:00
85,CAMPUS-JOB-085,2026-01-06 20:25:00,2026-01-06 23:01:40,9400,82.81,GPU Server,Research Lab,0.839,student-projects,2.41,On-campus compute workload,2026-01-06 20:25:00,2026-01-06 20:25:00
86,CAMPUS-JOB-086,2026-01-06 20:50:00,2026-01-06 22:56:47,7607,61.18,GPU Server,AI Lab,0.62,data-processing,1.72,On-campus compute workload,2026-01-06 20:50:00,2026-01-06 20:50:00
87,CAMPUS-JOB-087,2026-01-06 21:15:00,2026-01-06 23:46:32,9092,75.24,HPC Node,Research Lab,0.676,student-projects,2.16,On-campus compute workload,2026-01-06 21:15:00,2026-01-06 21:15:00
88,CAMPUS-JOB-088,2026-01-06 21:40:00,2026-01-06 23:34:33,6873,11.65,HPC Node,Research Lab,0.892,model-training,0.37,On-campus compute workload,2026-01-06 21:40:00,2026-01-06 21:40:00
89,CAMPUS-JOB-089,2026-01-06 22:05:00,2026-01-06 23:17:32,4352,52.41,CPU Server,Campus Data Center,0.826,student-projects,0.91,On-campus compute workload,2026-01-06 22:05:00,2026-01-06 22:05:00
90,CAMPUS-JOB-090,2026-01-06 22:30:00,2026-01-07 03:01:33,16293,18.05,HPC Node,AI Lab,0.672,data-processing,0.47,On-campus compute workload,2026-01-06 22:30:00,2026-01-06 22:30:00
91,CAMPUS-JOB-091,2026-01-06 22:55:00,2026-01-07 01:52:31,10651,77.36,GPU Server,Campus Data Center,0.79,student-projects,3.01,On-campus compute workload,2026-01-06 22:55:00,2026-01-06 22:55:00
92,CAMPUS-JOB-092,2026-01-06 23:20:00,2026-01-07 00:27:07,4027,13.12,GPU Server,Campus Data Center,0.879,model-training,0.46,On-campus compute workload,2026-01-06 23:20:00,2026-01-06 23:20:00
93,CAMPUS-JOB-093,2026-01-06 23:45:00,2026-01-07 03:58:55,15235,45.62,CPU Server,Computer Center,0.678,data-processing,1.37,On-campus compute workload,2026-01-06 23:45:00,2026-01-06 23:45:00
94,CAMPUS-JOB-094,2026-01-07 00:10:00,2026-01-07 04:51:11,16871,32.13,HPC Node,Campus Data Center,0.773,student-projects,0.98,On-campus compute workload,2026-01-07 00:10:00,2026-01-07 00:10:00
95,CAMPUS-JOB-095,2026-01-07 00:35:00,2026-01-07 03:18:13,9793,32.71,HPC Node,AI Lab,0.809,data-processing,1.06,On-campus compute workload,2026-01-07 00:35:00,2026-01-07 00:35:00
96,CAMPUS-JOB-096,2026-01-07 01:00:00,2026-01-07 03:47:07,10027,47.02,HPC Node,Computer Center,0.896,simulation,1.28,On-campus compute workload,2026-01-07 01:00:00,2026-01-07 01:00:00
97,CAMPUS-JOB-097,2026-01-07 01:25:00,2026-01-07 01:54:52,1792,72.73,HPC Node,Research Lab,0.873,simulation,2.55,On-campus compute workload,2026-01-07 01:25:00,2026-01-07 01:25:00
98,CAMPUS-JOB-098,2026-01-07 01:50:00,2026-01-07 06:21:05,16265,13.06,HPC Node,Computer Center,0.804,simulation,0.45,On-campus compute workload,2026-01-07 01:50:00,2026-01-07 01:50:00
99,CAMPUS-JOB-099,2026-01-07 02:15:00,2026-01-07 04:12:04,7024,42.99,HPC Node,AI Lab,0.725,data-processing,1.46,On-campus compute workload,2026-01-07 02:15:00,2026-01-07 02:15:00
100,CAMPUS-JOB-100,2026-01-07 02:40:00,2026-01-07 05:10:52,9052,70.57,GPU Server,AI Lab,0.704,simulation,1.2,On-campus compute workload,2026-01-07 02:40:00,2026-01-07 02:40:00`;

const RAW_AGGREGATES_CSV = `id,date,domain,total_co2e_kg,savings_kg
1,2026/01/01,Energy,1328.9,16.79
2,2026-01-01,Transport,796.31,16.79
3,2026/01/01,Waste,1387.77,16.79
4,2026/01/01,Food,1313.23,16.79
5,2026/01/01,IT,884.67,16.79
6,2026/01/02,Energy,1482.16,21.3
7,2026/01/02,Transport,437.28,21.3
8,2026/01/02,Waste,1330.22,21.3
9,2026/01/02,Food,1110.24,21.3
10,2026/01/02,IT,519.34,21.3
11,2026/01/03,Energy,1177.74,24.45
12,2026/01/03,Transport,1158.54,24.45
13,2026/01/03,Waste,492.61,24.45
14,2026/01/03,Food,490.2,24.45
15,2026/01/03,IT,612.46,24.45
16,2026/01/04,Energy,920.56,29.44
17,2026/01/04,Transport,1342.08,29.44
18,2026/01/04,Waste,895.61,29.44
19,2026/01/04,Food,790.66,29.44
20,2026/01/04,IT,1123.06,29.44
21,2026/01/05,Energy,860.14,35.86
22,2026/01/05,Transport,665.39,35.86
23,2026/01/05,Waste,695.81,35.86
24,2026/01/05,Food,1145.69,35.86
25,2026/01/05,IT,1143.25,35.86
26,2026/01/06,Energy,870.4,39.07
27,2026/01/06,Transport,1133.27,39.07
28,2026/01/06,Waste,543.21,39.07
29,2026/01/06,Food,1393.28,39.07
30,2026/01/06,IT,907.55,39.07
31,2026/01/07,Energy,444.33,44.25
32,2026/01/07,Transport,1415.38,44.25
33,2026/01/07,Waste,518.93,44.25
34,2026/01/07,Food,708.48,44.25
35,2026/01/07,IT,743.46,44.25
36,2026/01/08,Energy,1016.45,48.33
37,2026/01/08,Transport,748.73,48.33
38,2026/01/08,Waste,1491.8,48.33
39,2026/01/08,Food,1410.04,48.33
40,2026/01/08,IT,888.32,48.33
41,2026/01/09,Energy,1194.93,53.98
42,2026/01/09,Transport,1115.33,53.98
43,2026/01/09,Waste,1178.56,53.98
44,2026/01/09,Food,1283.01,53.98
45,2026/01/09,IT,1256.47,53.98
46,2026/01/10,Energy,1076.2,58
47,2026/01/10,Transport,834.65,58
48,2026/01/10,Waste,1165.1,58
49,2026/01/10,Food,447.69,58
50,2026/01/10,IT,1362.98,58
51,2026/01/11,Energy,1177.02,63.94
52,2026/01/11,Transport,826.93,63.94
53,2026/01/11,Waste,410.35,63.94
54,2026/01/11,Food,498.36,63.94
55,2026/01/11,IT,892.07,63.94
56,2026/01/12,Energy,1226.63,69.34
57,2026/01/12,Transport,1145.55,69.34
58,2026/01/12,Waste,996.59,69.34
59,2026/01/12,Food,1173.41,69.34
60,2026/01/12,IT,1495.97,69.34
61,2026/01/13,Energy,424.82,73.01
62,2026/01/13,Transport,1078.18,73.01
63,2026/01/13,Waste,777.23,73.01
64,2026/01/13,Food,1038.27,73.01
65,2026/01/13,IT,409.47,73.01
66,2026/01/14,Energy,1365.05,80.59
67,2026/01/14,Transport,1465.17,80.59
68,2026/01/14,Waste,487.57,80.59
69,2026/01/14,Food,1154.77,80.59
70,2026/01/14,IT,606.2,80.59
71,2026/01/15,Energy,682.99,87.45
72,2026/01/15,Transport,1131.79,87.45
73,2026/01/15,Waste,1384.59,87.45
74,2026/01/15,Food,1079.35,87.45
75,2026/01/15,IT,594.68,87.45
76,2026/01/16,Energy,1443.03,94.79
77,2026/01/16,Transport,725.47,94.79
78,2026/01/16,Waste,1286.6,94.79
79,2026/01/16,Food,753.33,94.79
80,2026/01/16,IT,1443.39,94.79
81,2026/01/17,Energy,982.02,99.27
82,2026/01/17,Transport,1333.09,99.27
83,2026/01/17,Waste,454.65,99.27
84,2026/01/17,Food,1143.68,99.27
85,2026/01/17,IT,1022.12,99.27
86,2026/01/18,Energy,931.34,105.25
87,2026/01/18,Transport,1252.83,105.25
88,2026/01/18,Waste,635.68,105.25
89,2026/01/18,Food,629.54,105.25
90,2026/01/18,IT,1184.13,105.25
91,2026/01/19,Energy,553.16,108.99
92,2026/01/19,Transport,1200.44,108.99
93,2026/01/19,Waste,451.98,108.99
94,2026/01/19,Food,1460.73,108.99
95,2026/01/19,IT,1237.69,108.99
96,2026/01/20,Energy,801.89,115.7
97,2026/01/20,Transport,770.14,115.7
98,2026/01/20,Waste,1246.74,115.7
99,2026/01/20,Food,1275.61,115.7
100,2026/01/20,IT,1337.83,115.7`;

const RAW_ELECTRICITY_CSV = `id,timestamp,location,consumption_kwh,end_use_category,grid_intensity,occupancy,weather_temp_c,notes,created_at,updated_at
1,2026-01-01 06:30:00,Academic Block B,69.47,HVAC,0.67,57,22.13,,2026-01-01 06:30:00,2026-01-01 06:30:00
2,2026-01-01 07:00:00,Academic Block B,36.75,Kitchen Equipment,0.826,28,34.45,,2026-01-01 07:00:00,2026-01-01 07:00:00
3,2026-01-01 07:30:00,Hostel,70.64,HVAC,0.661,114,34.37,,2026-01-01 07:30:00,2026-01-01 07:30:00
4,2026-01-01 08:00:00,Dining Hall,179.9,Kitchen Equipment,0.811,385,28.67,,2026-01-01 08:00:00,2026-01-01 08:00:00
5,2026-01-01 08:30:00,Library,33.68,Lighting,0.728,127,32.55,,2026-01-01 08:30:00,2026-01-01 08:30:00
6,2026-01-01 09:00:00,Academic Block B,32.69,Kitchen Equipment,0.694,117,29.06,,2026-01-01 09:00:00,2026-01-01 09:00:00
7,2026-01-01 09:30:00,Academic Block B,49.85,HVAC,0.881,137,22.56,,2026-01-01 09:30:00,2026-01-01 09:30:00
8,2026-01-01 10:00:00,Academic Block A,62.31,HVAC,0.65,125,26.99,,2026-01-01 10:00:00,2026-01-01 10:00:00
9,2026-01-01 10:30:00,Library,35.85,HVAC,0.794,148,28.54,,2026-01-01 10:30:00,2026-01-01 10:30:00
10,2026-01-01 11:00:00,Academic Block B,68.6,HVAC,0.78,111,31.73,,2026-01-01 11:00:00,2026-01-01 11:00:00
11,2026-01-01 11:30:00,Dining Hall,75.04,Mixed,0.797,129,34.11,,2026-01-01 11:30:00,2026-01-01 11:30:00
12,2026-01-01 12:00:00,Dining Hall,149.39,Lighting,0.69,350,28.79,,2026-01-01 12:00:00,2026-01-01 12:00:00
13,2026-01-01 12:30:00,Hostel,31.38,Mixed,0.799,38,34.16,,2026-01-01 12:30:00,2026-01-01 12:30:00
14,2026-01-01 13:00:00,Hostel,84.24,Mixed,0.823,101,32.92,,2026-01-01 13:00:00,2026-01-01 13:00:00
15,2026-01-01 13:30:00,Academic Block A,39.51,Lighting,0.839,144,29.04,,2026-01-01 13:30:00,2026-01-01 13:30:00
16,2026-01-01 14:00:00,Hostel,65.73,Lighting,0.702,25,28.54,,2026-01-01 14:00:00,2026-01-01 14:00:00
17,2026-01-01 14:30:00,Academic Block B,58.06,Mixed,0.606,106,31.17,,2026-01-01 14:30:00,2026-01-01 14:30:00
18,2026-01-01 15:00:00,Dining Hall,60.29,Lighting,0.856,55,34.97,,2026-01-01 15:00:00,2026-01-01 15:00:00
19,2026-01-01 15:30:00,Academic Block A,35.97,IT Equipment,0.818,55,24.78,,2026-01-01 15:30:00,2026-01-01 15:30:00
20,2026-01-01 16:00:00,Academic Block B,86.58,HVAC,0.784,76,33.58,,2026-01-01 16:00:00,2026-01-01 16:00:00
21,2026-01-01 16:30:00,Dining Hall,86.24,Lighting,0.621,124,30.16,,2026-01-01 16:30:00,2026-01-01 16:30:00
22,2026-01-01 17:00:00,Academic Block B,53.67,IT Equipment,0.8,109,28.62,,2026-01-01 17:00:00,2026-01-01 17:00:00
23,2026-01-01 17:30:00,Dining Hall,62.88,Lighting,0.791,23,30.87,,2026-01-01 17:30:00,2026-01-01 17:30:00
24,2026-01-01 18:00:00,Academic Block A,41.38,Lighting,0.799,113,28.75,,2026-01-01 18:00:00,2026-01-01 18:00:00
25,2026-01-01 18:30:00,Library,76.73,HVAC,0.692,87,32.43,,2026-01-01 18:30:00,2026-01-01 18:30:00
26,2026-01-01 19:00:00,Academic Block A,46.75,HVAC,0.606,20,32.95,,2026-01-01 19:00:00,2026-01-01 19:00:00
27,2026-01-01 19:30:00,Academic Block B,56.28,HVAC,0.62,62,30.08,,2026-01-01 19:30:00,2026-01-01 19:30:00
28,2026-01-01 20:00:00,Dining Hall,121.05,Mixed,0.883,375,25.71,,2026-01-01 20:00:00,2026-01-01 20:00:00
29,2026-01-01 20:30:00,Academic Block A,60.4,Kitchen Equipment,0.868,37,33.88,,2026-01-01 20:30:00,2026-01-01 20:30:00
30,2026-01-01 21:00:00,Dining Hall,82.57,Lighting,0.774,125,22.49,,2026-01-01 21:00:00,2026-01-01 21:00:00
31,2026-01-01 21:30:00,Library,69.51,Kitchen Equipment,0.693,95,31.12,,2026-01-01 21:30:00,2026-01-01 21:30:00
32,2026-01-01 22:00:00,Library,63.21,IT Equipment,0.66,88,33.7,,2026-01-01 22:00:00,2026-01-01 22:00:00
33,2026-01-01 22:30:00,Dining Hall,80.69,Kitchen Equipment,0.7,26,29.76,,2026-01-01 22:30:00,2026-01-01 22:30:00
34,2026-01-01 23:00:00,Academic Block B,75.38,Mixed,0.716,51,32.11,,2026-01-01 23:00:00,2026-01-01 23:00:00
35,2026-01-01 23:30:00,Hostel,74.62,Mixed,0.699,24,25.93,,2026-01-01 23:30:00,2026-01-01 23:30:00
36,2026-01-02 00:00:00,Academic Block A,86.19,Lighting,0.873,83,30.69,,2026-01-02 00:00:00,2026-01-02 00:00:00
37,2026-01-02 00:30:00,Library,37.07,HVAC,0.677,148,32.68,,2026-01-02 00:30:00,2026-01-02 00:30:00
38,2026-01-02 01:00:00,Hostel,31.14,IT Equipment,0.769,20,26.55,,2026-01-02 01:00:00,2026-01-02 01:00:00
39,2026-01-02 01:30:00,Dining Hall,89.18,Lighting,0.786,82,35.66,,2026-01-02 01:30:00,2026-01-02 01:30:00
40,2026-01-02 02:00:00,Hostel,78.23,Lighting,0.731,146,27.4,,2026-01-02 02:00:00,2026-01-02 02:00:00
41,2026-01-02 02:30:00,Hostel,32.13,IT Equipment,0.636,142,23.81,,2026-01-02 02:30:00,2026-01-02 02:30:00
42,2026-01-02 03:00:00,Library,45.71,IT Equipment,0.823,115,32.52,,2026-01-02 03:00:00,2026-01-02 03:00:00
43,2026-01-02 03:30:00,Hostel,70.84,Mixed,0.678,102,27.89,,2026-01-02 03:30:00,2026-01-02 03:30:00
44,2026-01-02 04:00:00,Library,80.36,Kitchen Equipment,0.789,40,35.08,,2026-01-02 04:00:00,2026-01-02 04:00:00
45,2026-01-02 04:30:00,Academic Block A,59.36,Kitchen Equipment,0.605,119,33.11,,2026-01-02 04:30:00,2026-01-02 04:30:00
46,2026-01-02 05:00:00,Dining Hall,78.24,IT Equipment,0.794,29,33.58,,2026-01-02 05:00:00,2026-01-02 05:00:00
47,2026-01-02 05:30:00,Dining Hall,65.3,IT Equipment,0.633,61,29.87,,2026-01-02 05:30:00,2026-01-02 05:30:00
48,2026-01-02 06:00:00,Academic Block A,79.51,Kitchen Equipment,0.837,129,32.97,,2026-01-02 06:00:00,2026-01-02 06:00:00
49,2026-01-02 06:30:00,Library,39.71,HVAC,0.715,69,24.47,,2026-01-02 06:30:00,2026-01-02 06:30:00
50,2026-01-02 07:00:00,Hostel,32.18,IT Equipment,0.844,63,32.15,,2026-01-02 07:00:00,2026-01-02 07:00:00
51,2026-01-02 07:30:00,Dining Hall,163.71,Lighting,0.682,253,25.31,,2026-01-02 07:30:00,2026-01-02 07:30:00
52,2026-01-02 08:00:00,Academic Block B,51.97,IT Equipment,0.699,134,25.09,,2026-01-02 08:00:00,2026-01-02 08:00:00
53,2026-01-02 08:30:00,Library,87.78,HVAC,0.699,32,29.39,,2026-01-02 08:30:00,2026-01-02 08:30:00
54,2026-01-02 09:00:00,Academic Block A,36.93,HVAC,0.741,85,23.23,,2026-01-02 09:00:00,2026-01-02 09:00:00
55,2026-01-02 09:30:00,Academic Block A,42.1,IT Equipment,0.675,103,34.14,,2026-01-02 09:30:00,2026-01-02 09:30:00
56,2026-01-02 10:00:00,Academic Block A,79.39,IT Equipment,0.672,119,25.1,,2026-01-02 10:00:00,2026-01-02 10:00:00
57,2026-01-02 10:30:00,Hostel,45.14,Mixed,0.706,100,31.5,,2026-01-02 10:30:00,2026-01-02 10:30:00
58,2026-01-02 11:00:00,Dining Hall,89.87,Lighting,0.792,57,32.79,,2026-01-02 11:00:00,2026-01-02 11:00:00
59,2026-01-02 11:30:00,Academic Block B,59.94,Lighting,0.74,55,28.13,,2026-01-02 11:30:00,2026-01-02 11:30:00
60,2026-01-02 12:00:00,Dining Hall,166.15,Mixed,0.858,376,22.37,,2026-01-02 12:00:00,2026-01-02 12:00:00
61,2026-01-02 12:30:00,Dining Hall,136.96,Mixed,0.623,349,27.65,,2026-01-02 12:30:00,2026-01-02 12:30:00
62,2026-01-02 13:00:00,Academic Block A,58.53,Lighting,0.8,117,27.56,,2026-01-02 13:00:00,2026-01-02 13:00:00
63,2026-01-02 13:30:00,Hostel,74.93,IT Equipment,0.857,109,29.05,,2026-01-02 13:30:00,2026-01-02 13:30:00
64,2026-01-02 14:00:00,Academic Block A,34.48,Kitchen Equipment,0.649,47,27.14,,2026-01-02 14:00:00,2026-01-02 14:00:00
65,2026-01-02 14:30:00,Library,47.86,HVAC,0.775,65,25.05,,2026-01-02 14:30:00,2026-01-02 14:30:00
66,2026-01-02 15:00:00,Hostel,42.49,Kitchen Equipment,0.71,59,33.02,,2026-01-02 15:00:00,2026-01-02 15:00:00
67,2026-01-02 15:30:00,Academic Block B,40.57,Lighting,0.849,134,32.92,,2026-01-02 15:30:00,2026-01-02 15:30:00
68,2026-01-02 16:00:00,Hostel,50.28,Mixed,0.688,83,24.91,,2026-01-02 16:00:00,2026-01-02 16:00:00
69,2026-01-02 16:30:00,Library,31.67,Lighting,0.709,47,33.31,,2026-01-02 16:30:00,2026-01-02 16:30:00
70,2026-01-02 17:00:00,Academic Block A,85.73,Mixed,0.793,109,23.16,,2026-01-02 17:00:00,2026-01-02 17:00:00
71,2026-01-02 17:30:00,Hostel,57.79,Lighting,0.64,103,32.81,,2026-01-02 17:30:00,2026-01-02 17:30:00
72,2026-01-02 18:00:00,Academic Block A,79.4,Lighting,0.853,52,23.42,,2026-01-02 18:00:00,2026-01-02 18:00:00
73,2026-01-02 18:30:00,Hostel,64.6,IT Equipment,0.687,38,28.99,,2026-01-02 18:30:00,2026-01-02 18:30:00
74,2026-01-02 19:00:00,Hostel,54.21,Lighting,0.825,115,35.62,,2026-01-02 19:00:00,2026-01-02 19:00:00
75,2026-01-02 19:30:00,Library,74.99,Mixed,0.656,123,25.66,,2026-01-02 19:30:00,2026-01-02 19:30:00
76,2026-01-02 20:00:00,Academic Block A,53.01,Lighting,0.721,35,34.02,,2026-01-02 20:00:00,2026-01-02 20:00:00
77,2026-01-02 20:30:00,Academic Block A,75.92,Mixed,0.885,100,29.12,,2026-01-02 20:30:00,2026-01-02 20:30:00
78,2026-01-02 21:00:00,Hostel,37.34,HVAC,0.829,143,23.67,,2026-01-02 21:00:00,2026-01-02 21:00:00
79,2026-01-02 21:30:00,Library,83.32,Mixed,0.752,92,32.86,,2026-01-02 21:30:00,2026-01-02 21:30:00
80,2026-01-02 22:00:00,Academic Block A,33.04,Kitchen Equipment,0.896,38,26,,2026-01-02 22:00:00,2026-01-02 22:00:00
81,2026-01-02 22:30:00,Library,51.01,Kitchen Equipment,0.657,49,33.53,,2026-01-02 22:30:00,2026-01-02 22:30:00
82,2026-01-02 23:00:00,Academic Block B,70.92,HVAC,0.79,62,35.69,,2026-01-02 23:00:00,2026-01-02 23:00:00
83,2026-01-02 23:30:00,Academic Block B,71.93,Mixed,0.602,119,33.88,,2026-01-02 23:30:00,2026-01-02 23:30:00
84,2026-01-03 00:00:00,Academic Block B,50.17,Mixed,0.71,92,35.47,,2026-01-03 00:00:00,2026-01-03 00:00:00
85,2026-01-03 00:30:00,Library,56.35,IT Equipment,0.74,95,28.34,,2026-01-03 00:30:00,2026-01-03 00:30:00
86,2026-01-03 01:00:00,Academic Block B,37.43,Kitchen Equipment,0.713,111,25.48,,2026-01-03 01:00:00,2026-01-03 01:00:00
87,2026-01-03 01:30:00,Dining Hall,63.05,Kitchen Equipment,0.61,80,30.53,,2026-01-03 01:30:00,2026-01-03 01:30:00
88,2026-01-03 02:00:00,Hostel,52.52,Kitchen Equipment,0.779,22,28.35,,2026-01-03 02:00:00,2026-01-03 02:00:00
89,2026-01-03 02:30:00,Library,42.34,Lighting,0.654,123,35.87,,2026-01-03 02:30:00,2026-01-03 02:30:00
90,2026-01-03 03:00:00,Library,74.42,HVAC,0.862,51,29.39,,2026-01-03 03:00:00,2026-01-03 03:00:00
91,2026-01-03 03:30:00,Dining Hall,39.48,Lighting,0.841,137,30.77,,2026-01-03 03:30:00,2026-01-03 03:30:00
92,2026-01-03 04:00:00,Hostel,78.45,Kitchen Equipment,0.786,87,23.56,,2026-01-03 04:00:00,2026-01-03 04:00:00
93,2026-01-03 04:30:00,Dining Hall,34.67,IT Equipment,0.623,103,31.04,,2026-01-03 04:30:00,2026-01-03 04:30:00
94,2026-01-03 05:00:00,Academic Block A,83.04,Mixed,0.71,148,25.01,,2026-01-03 05:00:00,2026-01-03 05:00:00
95,2026-01-03 05:30:00,Hostel,63,Kitchen Equipment,0.647,117,35.64,,2026-01-03 05:30:00,2026-01-03 05:30:00
96,2026-01-03 06:00:00,Dining Hall,32.01,Kitchen Equipment,0.832,131,27.11,,2026-01-03 06:00:00,2026-01-03 06:00:00
97,2026-01-03 06:30:00,Library,89.31,Lighting,0.774,37,32.31,,2026-01-03 06:30:00,2026-01-03 06:30:00
98,2026-01-03 07:00:00,Library,75.64,HVAC,0.75,52,34.71,,2026-01-03 07:00:00,2026-01-03 07:00:00
99,2026-01-03 07:30:00,Hostel,79.21,IT Equipment,0.768,103,32.2,,2026-01-03 07:30:00,2026-01-03 07:30:00
100,2026-01-03 08:00:00,Academic Block B,40.41,Mixed,0.604,126,25.7,,2026-01-03 08:00:00,2026-01-03 08:00:00`;

const RAW_EMISSION_FACTORS_CSV = `id,category,emission_factor,type,source
1,Electricity,0.475,Grid,EPA eGRID 2024
2,Natural Gas,0.18,Fuel,EPA 2024
3,Diesel,2.68,Fuel,EPA 2024
4,Beef,60,Food,Poore & Nemecek 2018
5,Lamb,24,Food,Poore & Nemecek 2018
6,Cheese,21,Food,Poore & Nemecek 2018
7,Chocolate,19,Food,Poore & Nemecek 2018
8,Coffee,17,Food,Poore & Nemecek 2018
9,Prawns,12,Food,Poore & Nemecek 2018
10,Palm Oil,8,Food,Poore & Nemecek 2018
11,Pig Meat,7,Food,Poore & Nemecek 2018
12,Poultry,6,Food,Poore & Nemecek 2018
13,Olive Oil,6,Food,Poore & Nemecek 2018
14,Fish (farmed),5,Food,Poore & Nemecek 2018
15,Eggs,4.5,Food,Poore & Nemecek 2018
16,Rice,4,Food,Poore & Nemecek 2018
17,Fish (wild),3,Food,Poore & Nemecek 2018
18,Milk,3,Food,Poore & Nemecek 2018
19,Wheat & Rye,1.4,Food,Poore & Nemecek 2018
20,Tomatoes,1.4,Food,Poore & Nemecek 2018
21,Maize,1,Food,Poore & Nemecek 2018
22,Cassava,1,Food,Poore & Nemecek 2018
23,Soymilk,0.9,Food,Poore & Nemecek 2018
24,Peas,0.9,Food,Poore & Nemecek 2018
25,Bananas,0.7,Food,Poore & Nemecek 2018
26,Root Vegetables,0.4,Food,Poore & Nemecek 2018
27,Apples,0.4,Food,Poore & Nemecek 2018
28,Citrus Fruit,0.3,Food,Poore & Nemecek 2018
29,Nuts,0.3,Food,Poore & Nemecek 2018
30,Potatoes,0.2,Food,Poore & Nemecek 2018`;

const RAW_FOOD_CSV = `id,date,meal_type,campus_location,servings_prepared,servings_consumed,waste_total_kg,waste_by_category_json,prep_start_time,prep_duration_minutes,diverted_waste_kg
1,2026-01-01,Breakfast,North Cafeteria,450,410,12.5,"{""fruit"": 5, ""bakery"": 7.5}",05:30,90,10
2,2026-01-01,Lunch,North Cafeteria,850,780,35.2,"{""protein"": 15, ""starch"": 20.2}",10:00,150,25
3,2026-01-01,Dinner,North Cafeteria,600,550,22.8,"{""vegetables"": 10, ""protein"": 12.8}",16:00,120,18
4,2026-01-01,Breakfast,South Hall,300,280,5.0,"{""dairy"": 2, ""fruit"": 3}",06:00,60,4
5,2026-01-01,Lunch,South Hall,500,420,28.5,"{""salad"": 10, ""soup"": 18.5}",10:30,120,20
6,2026-01-01,Dinner,South Hall,400,380,8.0,"{""bread"": 3, ""pasta"": 5}",16:30,90,5
7,2026-01-02,Breakfast,North Cafeteria,460,400,18.0,"{""eggs"": 8, ""fruit"": 10}",05:30,90,12
8,2026-01-02,Lunch,North Cafeteria,880,750,55.0,"{""meat"": 25, ""rice"": 30}",10:00,150,30
9,2026-01-02,Dinner,North Cafeteria,620,580,15.0,"{""veg"": 5, ""pizza"": 10}",16:00,120,12
10,2026-01-02,Breakfast,South Hall,310,290,6.0,"{""cereal"": 3, ""milk"": 3}",06:00,60,5
11,2026-01-02,Lunch,South Hall,520,480,14.0,"{""sandwich"": 4, ""chips"": 10}",10:30,120,10
12,2026-01-02,Dinner,South Hall,410,390,7.5,"{""tacos"": 7.5}",16:30,90,6
13,2026-01-03,Breakfast,North Cafeteria,440,420,6.0,"{""toast"": 6}",05:30,90,5
14,2026-01-03,Lunch,North Cafeteria,800,700,40.0,"{""curry"": 20, ""naan"": 20}",10:00,150,25
15,2026-01-03,Dinner,North Cafeteria,580,560,8.0,"{""salad"": 8}",16:00,120,6
16,2026-01-03,Breakfast,South Hall,280,260,4.0,"{""fruit"": 4}",06:00,60,3
17,2026-01-03,Lunch,South Hall,480,450,10.0,"{""soup"": 10}",10:30,120,8
18,2026-01-03,Dinner,South Hall,380,360,6.0,"{""pasta"": 6}",16:30,90,5
19,2026-01-04,Breakfast,North Cafeteria,400,350,15.0,"{""pancakes"": 15}",05:30,90,10
20,2026-01-04,Lunch,North Cafeteria,750,650,45.0,"{""roast"": 20, ""potatoes"": 25}",10:00,150,25
21,2026-01-04,Dinner,North Cafeteria,550,500,20.0,"{""stew"": 20}",16:00,120,15
22,2026-01-04,Breakfast,South Hall,250,220,9.0,"{""yogurt"": 9}",06:00,60,5
23,2026-01-04,Lunch,South Hall,450,400,18.0,"{""burger"": 8, ""fries"": 10}",10:30,120,12
24,2026-01-04,Dinner,South Hall,350,320,10.0,"{""pizza"": 10}",16:30,90,8
25,2026-01-05,Breakfast,North Cafeteria,480,450,9.0,"{""bagels"": 9}",05:30,90,7
26,2026-01-05,Lunch,North Cafeteria,900,850,20.0,"{""sushi"": 10, ""rice"": 10}",10:00,150,15
27,2026-01-05,Dinner,North Cafeteria,650,630,7.0,"{""noodles"": 7}",16:00,120,6
28,2026-01-05,Breakfast,South Hall,320,300,5.0,"{""fruit"": 5}",06:00,60,4
29,2026-01-05,Lunch,South Hall,530,500,11.0,"{""wrap"": 11}",10:30,120,9
30,2026-01-05,Dinner,South Hall,420,400,6.0,"{""salad"": 6}",16:30,90,5
31,2026-01-06,Breakfast,North Cafeteria,470,440,10.0,"{""muffin"": 10}",05:30,90,8
32,2026-01-06,Lunch,North Cafeteria,890,800,38.0,"{""lasagna"": 20, ""bread"": 18}",10:00,150,28
33,2026-01-06,Dinner,North Cafeteria,640,600,16.0,"{""fish"": 8, ""veg"": 8}",16:00,120,12
34,2026-01-06,Breakfast,South Hall,315,300,4.5,"{""oatmeal"": 4.5}",06:00,60,4
35,2026-01-06,Lunch,South Hall,525,490,13.0,"{""tuna"": 6, ""chips"": 7}",10:30,120,10
36,2026-01-06,Dinner,South Hall,415,395,7.0,"{""rice"": 7}",16:30,90,6
37,2026-01-07,Breakfast,North Cafeteria,490,460,9.5,"{""waffles"": 9.5}",05:30,90,8
38,2026-01-07,Lunch,North Cafeteria,920,860,26.0,"{""tacos"": 15, ""beans"": 11}",10:00,150,20
39,2026-01-07,Dinner,North Cafeteria,660,630,12.0,"{""chicken"": 12}",16:00,120,10
40,2026-01-07,Breakfast,South Hall,325,310,4.0,"{""smoothie"": 4}",06:00,60,3
41,2026-01-07,Lunch,South Hall,540,510,12.0,"{""sub"": 12}",10:30,120,9
42,2026-01-07,Dinner,South Hall,430,415,5.5,"{""salad"": 5.5}",16:30,90,5`;

// Utility Functions
const parseCSV = <T>(csvText: string): T[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const data: T[] = [];

  // Regex to split by comma but ignore commas inside quotes
  const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;
    
    // Split using regex
    const values = rawLine.split(regex).map(val => {
       let v = val.trim();
       // Remove surrounding quotes if present
       if (v.startsWith('"') && v.endsWith('"')) {
           v = v.slice(1, -1);
           // Unescape double quotes
           v = v.replace(/""/g, '"');
       }
       return v;
    });

    if (values.length !== headers.length) {
        // Simple fallback for lines that might be malformed or empty
        continue;
    }

    const obj: any = {};
    headers.forEach((header, index) => {
      const val = values[index];
      // Try to convert to number if possible and not an ID or specific text field
      const numVal = parseFloat(val);
      if (!isNaN(numVal) && !['id', 'job_id', 'date', 'timestamp', 'start_timestamp', 'end_timestamp', 'created_at', 'updated_at', 'meal_type', 'campus_location', 'notes', 'hardware_type', 'location_region', 'functional_unit', 'end_use_category', 'location', 'category', 'type', 'source', 'waste_by_category_json', 'prep_start_time'].includes(header)) {
         obj[header] = numVal;
      } else {
         obj[header] = val;
      }
    });
    data.push(obj as T);
  }
  return data;
};

// Simple Linear Regression Class for ML capabilities
class SimpleLinearRegression {
    slope: number = 0;
    intercept: number = 0;

    train(x: number[], y: number[]) {
        const n = x.length;
        if (n === 0) return;

        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
        const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

        this.slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        this.intercept = (sumY - this.slope * sumX) / n;
    }

    predict(x: number): number {
        return this.slope * x + this.intercept;
    }
}

export class DataService {
  private static instance: DataService;
  private data: AppData;

  private constructor() {
    this.data = {
      compute: parseCSV<ComputeRecord>(RAW_COMPUTE_CSV),
      aggregates: parseCSV<CarbonAggregate>(RAW_AGGREGATES_CSV),
      energy: parseCSV<ElectricityRecord>(RAW_ELECTRICITY_CSV),
      emissionFactors: parseCSV<EmissionFactor>(RAW_EMISSION_FACTORS_CSV),
      food: parseCSV<FoodRecord>(RAW_FOOD_CSV),
    };
  }

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  public getAllData(): AppData {
    return this.data;
  }

  public appendData(domain: keyof AppData, csvContent: string) {
      const parsed = parseCSV(csvContent);
      // @ts-ignore
      this.data[domain] = [...this.data[domain], ...parsed];
  }

  // --- ML & Predictive Logic ---

  public getPredictiveAnalysis(domain: string): PredictionResult {
      const model = new SimpleLinearRegression();
      let xValues: number[] = [];
      let yValues: number[] = [];
      let label = '';
      let unit = '';

      if (domain === 'food') {
          // Predict Food Waste
          this.data.food.forEach((r, i) => {
              xValues.push(i);
              yValues.push(r.waste_total_kg);
          });
          label = "Predicted Daily Waste";
          unit = "kg";
      } else if (domain === 'energy') {
          // Predict Energy Consumption
          this.data.energy.forEach((r, i) => {
              xValues.push(i);
              yValues.push(r.consumption_kwh);
          });
          label = "Predicted Hourly Load";
          unit = "kWh";
      } else {
          // Predict Compute Energy
          this.data.compute.forEach((r, i) => {
              xValues.push(i);
              yValues.push(r.energy_kwh);
          });
          label = "Predicted Job Energy";
          unit = "kWh";
      }

      model.train(xValues, yValues);
      const nextIndex = xValues.length;
      const nextValue = model.predict(nextIndex);
      // const currentValue = yValues[yValues.length - 1] || 0;
      
      const slope = model.slope;
      let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
      if (slope > 0.1) trend = 'increasing';
      else if (slope < -0.1) trend = 'decreasing';

      // Simple R-squared proxy or standard error could be used for confidence, 
      // but for this demo we'll use a heuristic based on sample size
      const confidence = Math.min(0.95, 0.5 + (xValues.length * 0.01)); 

      return {
          label,
          value: `${Math.abs(nextValue).toFixed(2)} ${unit}`,
          trend,
          confidence,
          nextValue
      };
  }

  public getMLInsights(domain: string): Suggestion[] {
      const suggestions: Suggestion[] = [];
      const prediction = this.getPredictiveAnalysis(domain);

      // --- Rule Engine: If-Else Situations based on CSV Data & ML ---

      if (domain === 'food') {
          const wasteAvg = this.data.food.reduce((acc, curr) => acc + curr.waste_total_kg, 0) / this.data.food.length;
          const wasteNext = prediction.nextValue;

          // Rule 1: High Waste Trend
          if (prediction.trend === 'increasing' && wasteNext > wasteAvg) {
              suggestions.push({
                  action: "Reduce Batch Sizes by 10%",
                  impact: "-15% Waste Forecast",
                  type: "critical",
                  reason: `ML detects an upward trend in waste (Predicted: ${wasteNext.toFixed(1)}kg vs Avg: ${wasteAvg.toFixed(1)}kg).`
              });
          }

          // Rule 2: Low Waste Day Prediction
          if (prediction.trend === 'decreasing') {
              suggestions.push({
                  action: "Optimize Staff Allocation",
                  impact: "+5% Efficiency",
                  type: "optimization",
                  reason: "Waste levels are trending down; opportunity to reallocate resource sorting labor."
              });
          }
          
          // Rule 3: Diverted Waste Check (Mock logic based on available fields)
          const latestRecord = this.data.food[this.data.food.length - 1];
          if (latestRecord && latestRecord.diverted_waste_kg < (latestRecord.waste_total_kg * 0.3)) {
               suggestions.push({
                  action: "Increase Composting Targets",
                  impact: "-200kg CO₂e",
                  type: "warning",
                  reason: "Compost diversion rate dropped below 30% in latest logs."
              });
          }

      } else if (domain === 'energy') {
          const intensityRecords = this.data.energy.map(e => e.grid_intensity);
          const currentIntensity = intensityRecords[intensityRecords.length - 1] || 0;
          const avgIntensity = intensityRecords.reduce((a,b) => a+b, 0) / intensityRecords.length;

          // Rule 1: Dirty Grid Alert
          if (currentIntensity > avgIntensity * 1.1) {
              suggestions.push({
                  action: "Shift Flexible HVAC Load",
                  impact: "-45kg CO₂e",
                  type: "critical",
                  reason: `Grid intensity (${currentIntensity.toFixed(3)}) is significantly higher than average.`
              });
          }

          // Rule 2: Peak Shaving
          if (prediction.trend === 'increasing') {
              suggestions.push({
                  action: "Pre-cool Lecture Halls",
                  impact: "-12% Peak Demand",
                  type: "optimization",
                  reason: "Energy consumption model predicts a rising peak in the next hour."
              });
          }

      } else if (domain === 'compute') {
          const latestJobs = this.data.compute.slice(-5);
          const lowEfficiencyJobs = latestJobs.filter(j => j.energy_kwh > 50 && j.duration_seconds < 3600);

          // Rule 1: Inefficient Jobs
          if (lowEfficiencyJobs.length > 0) {
              suggestions.push({
                  action: `Review ${lowEfficiencyJobs.length} Short-Duration High-Power Jobs`,
                  impact: "-80kg CO₂e",
                  type: "warning",
                  reason: "Detected high energy spikes for short duration tasks in recent CSV entries."
              });
          }

          // Rule 2: Grid Alignment
          const gridIntensity = 0.8; // Mock current high value
          if (gridIntensity > 0.5) {
               suggestions.push({
                  action: "Pause Batch Inference Queue",
                  impact: "-150kg CO₂e",
                  type: "optimization",
                  reason: "Current grid carbon intensity is unfavorable for non-critical batch jobs."
              });
          }
      }

      return suggestions;
  }

  // --- Existing Methods ---

  public getDashboardStats(): CampusStats {
    // Current simulation time: Jan 6th 2026, 14:00 (based on data availability)
    const simDate = '2026-01-06';
    
    // 1. Carbon Intensity (Latest from Energy Records)
    const latestEnergy = this.data.energy[this.data.energy.length - 1];
    const intensity = latestEnergy ? latestEnergy.grid_intensity * 1000 : 142; // convert kg to g if needed, or assume raw is kg/kWh -> 0.8 * 1000 = 800g

    // 2. Carbon Saved Today (From Aggregates)
    const todayAgg = this.data.aggregates.find(a => a.date === simDate || a.date.replace(/\//g, '-') === simDate); // Handle format diffs
    const saved = todayAgg ? todayAgg.savings_kg : 1240;

    // 3. Orchestrations (Active Compute Jobs)
    // Assume jobs without end_time or in future are active. 
    // Since mock data has fixed dates, we'll just count jobs starting on the sim date.
    const activeJobs = this.data.compute.filter(j => j.start_timestamp.includes(simDate)).length;

    return {
      carbonIntensity: Math.round(intensity), // scaling for display
      carbonSavedToday: Math.round(saved * 10) / 10,
      sustainabilityScore: 94, // Hardcoded or calculated
      activeOrchestrations: Math.max(3, activeJobs)
    };
  }

  public getEnergyPulseData() {
    // Return time series for the simulation day
    const simDate = '2026-01-01'; // Using Jan 1st for full 24h data availability in snippet
    return this.data.energy
      .filter(r => r.timestamp.includes(simDate))
      .map(r => ({
         time: r.timestamp.split(' ')[1].substring(0, 5), // HH:mm
         intensity: r.grid_intensity * 1000, // to gCO2e
         forecast: r.grid_intensity * 1000 * (0.9 + Math.random() * 0.2) // mock forecast
      }))
      .sort((a, b) => a.time.localeCompare(b.time)); 
  }

  public getFoodChartData() {
     // Aggregate by date
     const map = new Map<string, {demand: number, actual: number, waste: number}>();
     
     this.data.food.forEach(r => {
        const d = r.date;
        if (!map.has(d)) map.set(d, {demand: 0, actual: 0, waste: 0});
        const entry = map.get(d)!;
        entry.demand += r.servings_prepared;
        entry.actual += r.servings_consumed;
        entry.waste += r.waste_total_kg * 10; // visualizing scale
     });

     return Array.from(map.entries()).map(([date, val]) => ({
        day: date.substring(5), // MM-DD
        ...val
     })).slice(0, 7);
  }
}
