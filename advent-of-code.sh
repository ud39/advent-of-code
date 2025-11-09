# script to start frontend and backend of advent of code project

# Move to project
cd ./advent-of-code

# Create a new tmux session for frontend/backend

tmux new-session -d -s aoc-dev -n app

# Split window vertically: left = frontend, right = backend
tmux split-window -h -t aoc-dev

# Start Angular frontend in the left pane

tmux send-keys -t aoc-dev:app.0 'cd frontend && ng serve' C-m

# Start FastAPI backend in the right pane
tmux send-keys -t aoc-dev:app.1 '. backend/venv/bin/activate && fastapi dev backend/main.py' C-m

# Attach to main development session
tmux attach -t aoc-dev
