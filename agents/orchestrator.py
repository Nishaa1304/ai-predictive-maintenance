"""
Multi-Agent Orchestrator
Coordinates all specialized agents and manages task distribution
"""
import asyncio
from typing import Dict, List, Any, Optional
from datetime import datetime
import logging
from enum import Enum

class TaskType(Enum):
    DATA_ANALYSIS = "data_analysis"
    DIAGNOSIS = "diagnosis"
    SCHEDULING = "scheduling"
    CUSTOMER_ENGAGEMENT = "customer_engagement"
    FEEDBACK = "feedback"
    MANUFACTURING_INSIGHTS = "manufacturing_insights"

class TaskPriority(Enum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3
    CRITICAL = 4

class AgentOrchestrator:
    """
    Orchestrates multiple AI agents
    - Routes tasks to appropriate agents
    - Manages agent lifecycle
    - Monitors agent health
    - Handles inter-agent communication
    """
    
    def __init__(self):
        self.agents: Dict[str, Any] = {}
        self.task_queue: asyncio.Queue = asyncio.Queue()
        self.logger = logging.getLogger("orchestrator")
        self.is_running = False
        
        self.logger.info("Agent Orchestrator initialized")
    
    def register_agent(self, agent_type: str, agent: Any):
        """Register an agent with the orchestrator"""
        self.agents[agent_type] = agent
        self.logger.info(f"Registered agent: {agent_type}")
    
    async def start_all_agents(self):
        """Start all registered agents"""
        self.logger.info("Starting all agents...")
        for agent_type, agent in self.agents.items():
            try:
                await agent.start()
                self.logger.info(f"Started agent: {agent_type}")
            except Exception as e:
                self.logger.error(f"Failed to start agent {agent_type}: {str(e)}")
        
        self.is_running = True
        self.logger.info("All agents started successfully")
    
    async def stop_all_agents(self):
        """Stop all registered agents"""
        self.logger.info("Stopping all agents...")
        self.is_running = False
        
        for agent_type, agent in self.agents.items():
            try:
                await agent.stop()
                self.logger.info(f"Stopped agent: {agent_type}")
            except Exception as e:
                self.logger.error(f"Failed to stop agent {agent_type}: {str(e)}")
        
        self.logger.info("All agents stopped")
    
    async def submit_task(self, task_type: TaskType, task_data: Dict[str, Any], 
                          priority: TaskPriority = TaskPriority.MEDIUM):
        """Submit a task to the appropriate agent"""
        task = {
            "task_id": f"task_{datetime.now().timestamp()}",
            "task_type": task_type.value,
            "priority": priority.value,
            "data": task_data,
            "timestamp": datetime.now().isoformat()
        }
        
        await self.task_queue.put(task)
        self.logger.info(f"Task submitted: {task['task_id']} (Type: {task_type.value})")
    
    async def process_tasks(self):
        """Process tasks from the queue"""
        while self.is_running:
            try:
                task = await asyncio.wait_for(self.task_queue.get(), timeout=1.0)
                await self._route_task(task)
            except asyncio.TimeoutError:
                continue
            except Exception as e:
                self.logger.error(f"Error processing task: {str(e)}")
    
    async def _route_task(self, task: Dict[str, Any]):
        """Route task to the appropriate agent"""
        task_type = task["task_type"]
        
        agent_mapping = {
            TaskType.DATA_ANALYSIS.value: "data_analysis",
            TaskType.DIAGNOSIS.value: "diagnosis",
            TaskType.SCHEDULING.value: "scheduling",
            TaskType.CUSTOMER_ENGAGEMENT.value: "customer_engagement",
            TaskType.FEEDBACK.value: "feedback",
            TaskType.MANUFACTURING_INSIGHTS.value: "manufacturing_insights"
        }
        
        agent_key = agent_mapping.get(task_type)
        
        if agent_key and agent_key in self.agents:
            agent = self.agents[agent_key]
            try:
                self.logger.info(f"Routing task {task['task_id']} to {agent_key} agent")
                result = await agent.process_task(task)
                self.logger.info(f"Task {task['task_id']} completed successfully")
                return result
            except Exception as e:
                self.logger.error(f"Error in agent {agent_key}: {str(e)}")
                agent.handle_error(e)
        else:
            self.logger.error(f"No agent found for task type: {task_type}")
    
    def get_system_status(self) -> Dict[str, Any]:
        """Get status of all agents"""
        status = {
            "orchestrator_running": self.is_running,
            "task_queue_size": self.task_queue.qsize(),
            "agents": {}
        }
        
        for agent_type, agent in self.agents.items():
            status["agents"][agent_type] = agent.get_status()
        
        return status
    
    async def health_check(self) -> bool:
        """Check health of all agents"""
        all_healthy = True
        
        for agent_type, agent in self.agents.items():
            if not agent.is_healthy():
                self.logger.warning(f"Agent {agent_type} is unhealthy")
                all_healthy = False
        
        return all_healthy

# Example usage
async def main():
    orchestrator = AgentOrchestrator()
    
    # Register agents (to be implemented)
    # orchestrator.register_agent("data_analysis", DataAnalysisAgent(...))
    # orchestrator.register_agent("diagnosis", DiagnosisAgent(...))
    # ... register other agents
    
    await orchestrator.start_all_agents()
    
    # Start processing tasks
    task_processor = asyncio.create_task(orchestrator.process_tasks())
    
    # Submit example tasks
    await orchestrator.submit_task(
        TaskType.DATA_ANALYSIS,
        {"vehicle_id": "VIN12345", "telemetry": {...}},
        TaskPriority.HIGH
    )
    
    # Keep running
    try:
        await task_processor
    except KeyboardInterrupt:
        await orchestrator.stop_all_agents()

if __name__ == "__main__":
    asyncio.run(main())
